package auth

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/protobuf/types/known/timestamppb"

	authpb "ai-boshqaruv-backend/api/proto/auth"
	"ai-boshqaruv-backend/internal/auth"
	"ai-boshqaruv-backend/internal/database"
	"ai-boshqaruv-backend/internal/utils"
)

type Service struct {
	db         *database.DB
	jwtManager *auth.JWTManager
}

func NewService(db *database.DB, jwtManager *auth.JWTManager) *Service {
	return &Service{
		db:         db,
		jwtManager: jwtManager,
	}
}

// Login authenticates a user and returns JWT token
func (s *Service) Login(ctx context.Context, req *authpb.LoginRequest) (*authpb.LoginResponse, error) {
	// Get user from database
	query := `
		SELECT id, email, password_hash, name, role, company_id
		FROM users
		WHERE email = $1
	`

	var userID, companyID int64
	var email, passwordHash, name, role string

	err := s.db.Pool.QueryRow(ctx, query, req.Email).Scan(
		&userID,
		&email,
		&passwordHash,
		&name,
		&role,
		&companyID,
	)

	if err == pgx.ErrNoRows {
		return nil, utils.ErrInvalidArgument("Invalid email or password").ToGRPC()
	}

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get user")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	// Verify password
	err = bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(req.Password))
	if err != nil {
		return nil, utils.ErrInvalidArgument("Invalid email or password").ToGRPC()
	}

	// Generate tokens
	token, err := s.jwtManager.GenerateToken(userID, email, role, companyID)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to generate token")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	refreshToken, err := s.jwtManager.GenerateRefreshToken(userID)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to generate refresh token")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	expiresAt := time.Now().Add(24 * time.Hour)

	return &authpb.LoginResponse{
		Token:        token,
		RefreshToken: refreshToken,
		User: &authpb.User{
			Id:        userID,
			Email:     email,
			Name:      name,
			Role:      role,
			CompanyId: companyID,
		},
		ExpiresAt: timestamppb.New(expiresAt),
	}, nil
}

// Register creates a new user and company
func (s *Service) Register(ctx context.Context, req *authpb.RegisterRequest) (*authpb.RegisterResponse, error) {
	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to hash password")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	// Start transaction
	tx, err := s.db.Pool.Begin(ctx)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to begin transaction")
		return nil, utils.ErrInternal(err).ToGRPC()
	}
	defer tx.Rollback(ctx)

	// Create company
	var companyID int64
	companyQuery := `
		INSERT INTO companies (name, status, plan)
		VALUES ($1, 'trial', 'starter')
		RETURNING id
	`

	err = tx.QueryRow(ctx, companyQuery, req.CompanyName).Scan(&companyID)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to create company")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	// Create user
	var userID int64
	userQuery := `
		INSERT INTO users (email, password_hash, name, role, company_id)
		VALUES ($1, $2, $3, 'admin', $4)
		RETURNING id
	`

	err = tx.QueryRow(ctx, userQuery, req.Email, string(hashedPassword), req.Name, companyID).Scan(&userID)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to create user")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	// Commit transaction
	err = tx.Commit(ctx)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to commit transaction")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	// Generate token
	token, err := s.jwtManager.GenerateToken(userID, req.Email, "admin", companyID)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to generate token")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	return &authpb.RegisterResponse{
		Token: token,
		User: &authpb.User{
			Id:        userID,
			Email:     req.Email,
			Name:      req.Name,
			Role:      "admin",
			CompanyId: companyID,
		},
	}, nil
}

// ValidateToken validates a JWT token and returns user info
func (s *Service) ValidateToken(ctx context.Context, req *authpb.ValidateTokenRequest) (*authpb.ValidateTokenResponse, error) {
	claims, err := s.jwtManager.ValidateToken(req.Token)
	if err != nil {
		return &authpb.ValidateTokenResponse{
			Valid: false,
		}, nil
	}

	return &authpb.ValidateTokenResponse{
		Valid: true,
		User: &authpb.User{
			Id:        claims.UserID,
			Email:     claims.Email,
			Role:      claims.Role,
			CompanyId: claims.CompanyID,
		},
	}, nil
}

// RefreshToken generates a new access token from refresh token
func (s *Service) RefreshToken(ctx context.Context, req *authpb.RefreshTokenRequest) (*authpb.RefreshTokenResponse, error) {
	// Validate refresh token
	token, err := s.jwtManager.ValidateToken(req.RefreshToken)
	if err != nil {
		return nil, utils.ErrUnauthenticated("Invalid refresh token").ToGRPC()
	}

	// Get user info from database
	query := `
		SELECT id, email, role, company_id
		FROM users
		WHERE id = $1
	`

	var userID, companyID int64
	var email, role string

	err = s.db.Pool.QueryRow(ctx, query, token.UserID).Scan(&userID, &email, &role, &companyID)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get user")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	// Generate new tokens
	newToken, err := s.jwtManager.GenerateToken(userID, email, role, companyID)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to generate token")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	newRefreshToken, err := s.jwtManager.GenerateRefreshToken(userID)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to generate refresh token")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	expiresAt := time.Now().Add(24 * time.Hour)

	return &authpb.RefreshTokenResponse{
		Token:        newToken,
		RefreshToken: newRefreshToken,
		ExpiresAt:    timestamppb.New(expiresAt),
	}, nil
}

