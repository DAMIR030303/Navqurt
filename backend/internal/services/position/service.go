package position

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"google.golang.org/protobuf/types/known/timestamppb"

	positionpb "ai-boshqaruv-backend/api/proto/position"
	"ai-boshqaruv-backend/internal/database"
	"ai-boshqaruv-backend/internal/utils"
)

type Service struct {
	db *database.DB
}

func NewService(db *database.DB) *Service {
	return &Service{db: db}
}

// CreatePosition creates a new position
func (s *Service) CreatePosition(ctx context.Context, req *positionpb.CreatePositionRequest) (*positionpb.Position, error) {
	query := `
		INSERT INTO positions (company_id, name, description, department, max_employees, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
		RETURNING id, company_id, name, description, department, max_employees, created_at, updated_at
	`

	var pos positionpb.Position
	var createdAt, updatedAt time.Time

	err := s.db.Pool.QueryRow(ctx, query,
		req.CompanyId,
		req.Name,
		req.Description,
		req.Department,
		req.MaxEmployees,
	).Scan(
		&pos.Id,
		&pos.CompanyId,
		&pos.Name,
		&pos.Description,
		&pos.Department,
		&pos.MaxEmployees,
		&createdAt,
		&updatedAt,
	)

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to create position")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	pos.CreatedAt = timestamppb.New(createdAt)
	pos.UpdatedAt = timestamppb.New(updatedAt)

	return &pos, nil
}

// GetPosition retrieves a position by ID
func (s *Service) GetPosition(ctx context.Context, req *positionpb.GetPositionRequest) (*positionpb.Position, error) {
	query := `
		SELECT id, company_id, name, description, department, max_employees, created_at, updated_at
		FROM positions
		WHERE id = $1
	`

	var pos positionpb.Position
	var createdAt, updatedAt time.Time

	err := s.db.Pool.QueryRow(ctx, query, req.Id).Scan(
		&pos.Id,
		&pos.CompanyId,
		&pos.Name,
		&pos.Description,
		&pos.Department,
		&pos.MaxEmployees,
		&createdAt,
		&updatedAt,
	)

	if err == pgx.ErrNoRows {
		return nil, utils.ErrNotFound("Position").ToGRPC()
	}

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get position")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	pos.CreatedAt = timestamppb.New(createdAt)
	pos.UpdatedAt = timestamppb.New(updatedAt)

	return &pos, nil
}

// ListPositions lists positions with pagination and filters
func (s *Service) ListPositions(ctx context.Context, req *positionpb.ListPositionsRequest) (*positionpb.ListPositionsResponse, error) {
	page := req.Page
	if page < 1 {
		page = 1
	}

	pageSize := req.PageSize
	if pageSize < 1 || pageSize > 100 {
		pageSize = 20
	}

	offset := (page - 1) * pageSize

	// Build query
	query := `
		SELECT id, company_id, name, description, department, max_employees, created_at, updated_at
		FROM positions
		WHERE company_id = $1
	`
	args := []interface{}{req.CompanyId}
	argPos := 2

	if req.Search != "" {
		query += fmt.Sprintf(" AND (name ILIKE $%d OR description ILIKE $%d)", argPos, argPos)
		args = append(args, "%"+req.Search+"%")
		argPos++
	}

	if req.Department != "" {
		query += fmt.Sprintf(" AND department = $%d", argPos)
		args = append(args, req.Department)
		argPos++
	}

	query += fmt.Sprintf(" ORDER BY created_at DESC LIMIT $%d OFFSET $%d", argPos, argPos+1)
	args = append(args, pageSize, offset)

	rows, err := s.db.Pool.Query(ctx, query, args...)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to list positions")
		return nil, utils.ErrInternal(err).ToGRPC()
	}
	defer rows.Close()

	var positions []*positionpb.Position
	for rows.Next() {
		var pos positionpb.Position
		var createdAt, updatedAt time.Time

		err := rows.Scan(
			&pos.Id,
			&pos.CompanyId,
			&pos.Name,
			&pos.Description,
			&pos.Department,
			&pos.MaxEmployees,
			&createdAt,
			&updatedAt,
		)

		if err != nil {
			utils.Logger().Error().Err(err).Msg("Failed to scan position")
			continue
		}

		pos.CreatedAt = timestamppb.New(createdAt)
		pos.UpdatedAt = timestamppb.New(updatedAt)
		positions = append(positions, &pos)
	}

	// Get total count
	countQuery := "SELECT COUNT(*) FROM positions WHERE company_id = $1"
	countArgs := []interface{}{req.CompanyId}
	countArgPos := 2

	if req.Search != "" {
		countQuery += fmt.Sprintf(" AND (name ILIKE $%d OR description ILIKE $%d)", countArgPos, countArgPos)
		countArgs = append(countArgs, "%"+req.Search+"%")
		countArgPos++
	}

	if req.Department != "" {
		countQuery += fmt.Sprintf(" AND department = $%d", countArgPos)
		countArgs = append(countArgs, req.Department)
		countArgPos++
	}

	var total int32
	err = s.db.Pool.QueryRow(ctx, countQuery, countArgs...).Scan(&total)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to count positions")
		total = int32(len(positions))
	}

	return &positionpb.ListPositionsResponse{
		Positions: positions,
		Total:     total,
		Page:      page,
		PageSize:  pageSize,
	}, nil
}

// UpdatePosition updates a position
func (s *Service) UpdatePosition(ctx context.Context, req *positionpb.UpdatePositionRequest) (*positionpb.Position, error) {
	query := `
		UPDATE positions
		SET name = COALESCE($2, name),
		    description = COALESCE($3, description),
		    department = COALESCE($4, department),
		    max_employees = COALESCE($5, max_employees),
		    updated_at = NOW()
		WHERE id = $1
		RETURNING id, company_id, name, description, department, max_employees, created_at, updated_at
	`

	var pos positionpb.Position
	var createdAt, updatedAt time.Time

	err := s.db.Pool.QueryRow(ctx, query,
		req.Id,
		req.Name,
		req.Description,
		req.Department,
		req.MaxEmployees,
	).Scan(
		&pos.Id,
		&pos.CompanyId,
		&pos.Name,
		&pos.Description,
		&pos.Department,
		&pos.MaxEmployees,
		&createdAt,
		&updatedAt,
	)

	if err == pgx.ErrNoRows {
		return nil, utils.ErrNotFound("Position").ToGRPC()
	}

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to update position")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	pos.CreatedAt = timestamppb.New(createdAt)
	pos.UpdatedAt = timestamppb.New(updatedAt)

	return &pos, nil
}

// DeletePosition deletes a position
func (s *Service) DeletePosition(ctx context.Context, req *positionpb.DeletePositionRequest) error {
	query := `DELETE FROM positions WHERE id = $1`

	result, err := s.db.Pool.Exec(ctx, query, req.Id)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to delete position")
		return utils.ErrInternal(err).ToGRPC()
	}

	if result.RowsAffected() == 0 {
		return utils.ErrNotFound("Position").ToGRPC()
	}

	return nil
}

