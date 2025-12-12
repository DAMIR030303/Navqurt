package kpi

import (
	"context"

	"google.golang.org/protobuf/types/known/timestamppb"

	kpipb "ai-boshqaruv-backend/api/proto/kpi"
	"ai-boshqaruv-backend/internal/database"
	"ai-boshqaruv-backend/internal/utils"
)

type Service struct {
	db *database.DB
}

func NewService(db *database.DB) *Service {
	return &Service{db: db}
}

// CalculateKPI calculates KPI for an employee
func (s *Service) CalculateKPI(ctx context.Context, req *kpipb.CalculateKPIRequest) (*kpipb.CalculateKPIResponse, error) {
	// Get employee metrics from database
	// This is a simplified version - in production, you'd have actual KPI metrics stored
	query := `
		SELECT 
			e.id,
			e.first_name || ' ' || e.last_name as name,
			COALESCE(e.performance, 0) as performance_score
		FROM employees e
		WHERE e.id = $1
	`

	var employeeID int64
	var employeeName string
	var performanceScore int32

	err := s.db.Pool.QueryRow(ctx, query, req.EmployeeId).Scan(
		&employeeID,
		&employeeName,
		&performanceScore,
	)

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get employee for KPI calculation")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	// Calculate KPI metrics (simplified)
	// In production, you'd have actual KPI metrics stored in a separate table
	metrics := []*kpipb.KPIMetric{
		{
			Id:         1,
			Name:       "Davomat darajasi",
			Description: "Ishga kelish foizi",
			Unit:       "%",
			Target:     100,
			Current:    float64(performanceScore),
			Percentage: float64(performanceScore),
		},
		{
			Id:         2,
			Name:       "Vazifalar bajarilishi",
			Description: "Bajarilgan vazifalar foizi",
			Unit:       "%",
			Target:     100,
			Current:    float64(performanceScore),
			Percentage: float64(performanceScore),
		},
	}

	// Calculate overall score (average of all metrics)
	var totalPercentage float64
	for _, m := range metrics {
		totalPercentage += m.Percentage
	}
	overallScore := totalPercentage / float64(len(metrics))

	// Calculate bonus (15% of base salary if KPI >= 90%)
	bonusAmount := 0.0
	if overallScore >= 90 {
		// Assuming base salary of 5,000,000 (should come from employee record)
		baseSalary := 5000000.0
		bonusAmount = baseSalary * 0.15
	}

	employeeKPI := &kpipb.EmployeeKPI{
		EmployeeId:   employeeID,
		EmployeeName: employeeName,
		Metrics:      metrics,
		OverallScore: overallScore,
		UpdatedAt:    timestamppb.Now(),
	}

	return &kpipb.CalculateKPIResponse{
		Kpi:         employeeKPI,
		BonusAmount: bonusAmount,
	}, nil
}

// GetKPIMetrics retrieves KPI metrics for an employee
func (s *Service) GetKPIMetrics(ctx context.Context, req *kpipb.GetKPIMetricsRequest) (*kpipb.GetKPIMetricsResponse, error) {
	// Similar to CalculateKPI but retrieves stored metrics
	// For now, we'll use CalculateKPI logic
	calcResp, err := s.CalculateKPI(ctx, &kpipb.CalculateKPIRequest{
		EmployeeId: req.EmployeeId,
		Period:     req.Period,
	})

	if err != nil {
		return nil, err
	}

	return &kpipb.GetKPIMetricsResponse{
		Kpi: calcResp.Kpi,
	}, nil
}

// StreamKPIUpdates streams KPI updates for an employee
func (s *Service) StreamKPIUpdates(req *kpipb.StreamKPIUpdatesRequest, stream kpipb.KPIService_StreamKPIUpdatesServer) error {
	ctx := stream.Context()

	// Get initial KPI
	metricsResp, err := s.GetKPIMetrics(ctx, &kpipb.GetKPIMetricsRequest{
		EmployeeId: req.EmployeeId,
		Period:     "realtime",
	})

	if err != nil {
		return err
	}

	// Send initial update
	err = stream.Send(&kpipb.StreamKPIUpdatesResponse{
		Kpi:       metricsResp.Kpi,
		Timestamp: timestamppb.Now(),
	})

	if err != nil {
		return err
	}

	// In production, you'd set up a ticker or database listener
	// For now, this is a placeholder
	// You would typically use:
	// - Database triggers + LISTEN/NOTIFY
	// - Redis pub/sub
	// - Message queue (RabbitMQ, Kafka)

	return nil
}

