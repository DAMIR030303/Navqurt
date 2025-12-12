package handlers

import (
	"context"

	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"

	contractpb "ai-boshqaruv-backend/api/proto/contract"
	contractservice "ai-boshqaruv-backend/internal/services/contract"
)

type ContractHandler struct {
	contractpb.UnimplementedContractServiceServer
	service *contractservice.Service
}

func NewContractHandler(service *contractservice.Service) *ContractHandler {
	return &ContractHandler{service: service}
}

func (h *ContractHandler) CreateContract(ctx context.Context, req *contractpb.CreateContractRequest) (*contractpb.Contract, error) {
	return h.service.CreateContract(ctx, req)
}

func (h *ContractHandler) GetContract(ctx context.Context, req *contractpb.GetContractRequest) (*contractpb.Contract, error) {
	return h.service.GetContract(ctx, req)
}

func (h *ContractHandler) ListContracts(ctx context.Context, req *contractpb.ListContractsRequest) (*contractpb.ListContractsResponse, error) {
	return h.service.ListContracts(ctx, req)
}

func (h *ContractHandler) UpdateContract(ctx context.Context, req *contractpb.UpdateContractRequest) (*contractpb.Contract, error) {
	return h.service.UpdateContract(ctx, req)
}

func (h *ContractHandler) DeleteContract(ctx context.Context, req *contractpb.DeleteContractRequest) (*emptypb.Empty, error) {
	err := h.service.DeleteContract(ctx, req)
	if err != nil {
		return nil, err
	}
	return &emptypb.Empty{}, nil
}

// Register registers the handler with gRPC server
func (h *ContractHandler) Register(s *grpc.Server) {
	contractpb.RegisterContractServiceServer(s, h)
}

