package handlers

import (
	"context"

	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"

	positionpb "ai-boshqaruv-backend/api/proto/position"
	positionservice "ai-boshqaruv-backend/internal/services/position"
)

type PositionHandler struct {
	positionpb.UnimplementedPositionServiceServer
	service *positionservice.Service
}

func NewPositionHandler(service *positionservice.Service) *PositionHandler {
	return &PositionHandler{service: service}
}

func (h *PositionHandler) CreatePosition(ctx context.Context, req *positionpb.CreatePositionRequest) (*positionpb.Position, error) {
	return h.service.CreatePosition(ctx, req)
}

func (h *PositionHandler) GetPosition(ctx context.Context, req *positionpb.GetPositionRequest) (*positionpb.Position, error) {
	return h.service.GetPosition(ctx, req)
}

func (h *PositionHandler) ListPositions(ctx context.Context, req *positionpb.ListPositionsRequest) (*positionpb.ListPositionsResponse, error) {
	return h.service.ListPositions(ctx, req)
}

func (h *PositionHandler) UpdatePosition(ctx context.Context, req *positionpb.UpdatePositionRequest) (*positionpb.Position, error) {
	return h.service.UpdatePosition(ctx, req)
}

func (h *PositionHandler) DeletePosition(ctx context.Context, req *positionpb.DeletePositionRequest) (*emptypb.Empty, error) {
	err := h.service.DeletePosition(ctx, req)
	if err != nil {
		return nil, err
	}
	return &emptypb.Empty{}, nil
}

// Register registers the handler with gRPC server
func (h *PositionHandler) Register(s *grpc.Server) {
	positionpb.RegisterPositionServiceServer(s, h)
}

