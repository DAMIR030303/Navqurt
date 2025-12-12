package handlers

import (
	"context"

	"google.golang.org/grpc"

	financepb "ai-boshqaruv-backend/api/proto/finance"
	financeservice "ai-boshqaruv-backend/internal/services/finance"
)

type FinanceHandler struct {
	financepb.UnimplementedFinanceServiceServer
	service *financeservice.Service
}

func NewFinanceHandler(service *financeservice.Service) *FinanceHandler {
	return &FinanceHandler{service: service}
}

func (h *FinanceHandler) CalculateSalary(ctx context.Context, req *financepb.CalculateSalaryRequest) (*financepb.CalculateSalaryResponse, error) {
	return h.service.CalculateSalary(ctx, req)
}

func (h *FinanceHandler) GetSalaryHistory(ctx context.Context, req *financepb.GetSalaryHistoryRequest) (*financepb.GetSalaryHistoryResponse, error) {
	return h.service.GetSalaryHistory(ctx, req)
}

func (h *FinanceHandler) GetTransactions(ctx context.Context, req *financepb.GetTransactionsRequest) (*financepb.GetTransactionsResponse, error) {
	return h.service.GetTransactions(ctx, req)
}

func (h *FinanceHandler) GetReports(ctx context.Context, req *financepb.GetReportsRequest) (*financepb.GetReportsResponse, error) {
	return h.service.GetReports(ctx, req)
}

// Register registers the handler with gRPC server
func (h *FinanceHandler) Register(s *grpc.Server) {
	financepb.RegisterFinanceServiceServer(s, h)
}



