package handlers

import (
	"context"

	"google.golang.org/grpc"

	kpipb "ai-boshqaruv-backend/api/proto/kpi"
	kpiservice "ai-boshqaruv-backend/internal/services/kpi"
)

type KPIHandler struct {
	kpipb.UnimplementedKPIServiceServer
	service *kpiservice.Service
}

func NewKPIHandler(service *kpiservice.Service) *KPIHandler {
	return &KPIHandler{service: service}
}

func (h *KPIHandler) CalculateKPI(ctx context.Context, req *kpipb.CalculateKPIRequest) (*kpipb.CalculateKPIResponse, error) {
	return h.service.CalculateKPI(ctx, req)
}

func (h *KPIHandler) GetKPIMetrics(ctx context.Context, req *kpipb.GetKPIMetricsRequest) (*kpipb.GetKPIMetricsResponse, error) {
	return h.service.GetKPIMetrics(ctx, req)
}

func (h *KPIHandler) StreamKPIUpdates(req *kpipb.StreamKPIUpdatesRequest, stream kpipb.KPIService_StreamKPIUpdatesServer) error {
	return h.service.StreamKPIUpdates(req, stream)
}

// Register registers the handler with gRPC server
func (h *KPIHandler) Register(s *grpc.Server) {
	kpipb.RegisterKPIServiceServer(s, h)
}

