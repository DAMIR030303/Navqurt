package handlers

import (
	"context"

	"google.golang.org/grpc"

	authpb "ai-boshqaruv-backend/api/proto/auth"
	authservice "ai-boshqaruv-backend/internal/services/auth"
)

type AuthHandler struct {
	authpb.UnimplementedAuthServiceServer
	service *authservice.Service
}

func NewAuthHandler(service *authservice.Service) *AuthHandler {
	return &AuthHandler{service: service}
}

func (h *AuthHandler) Login(ctx context.Context, req *authpb.LoginRequest) (*authpb.LoginResponse, error) {
	return h.service.Login(ctx, req)
}

func (h *AuthHandler) Register(ctx context.Context, req *authpb.RegisterRequest) (*authpb.RegisterResponse, error) {
	return h.service.Register(ctx, req)
}

func (h *AuthHandler) ValidateToken(ctx context.Context, req *authpb.ValidateTokenRequest) (*authpb.ValidateTokenResponse, error) {
	return h.service.ValidateToken(ctx, req)
}

func (h *AuthHandler) RefreshToken(ctx context.Context, req *authpb.RefreshTokenRequest) (*authpb.RefreshTokenResponse, error) {
	return h.service.RefreshToken(ctx, req)
}

// RegisterService registers the handler with gRPC server
func (h *AuthHandler) RegisterService(s *grpc.Server) {
	authpb.RegisterAuthServiceServer(s, h)
}

