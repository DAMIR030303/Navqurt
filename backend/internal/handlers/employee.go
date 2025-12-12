package handlers

import (
	"context"

	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"

	employeepb "ai-boshqaruv-backend/api/proto/employee"
	employeeservice "ai-boshqaruv-backend/internal/services/employee"
)

type EmployeeHandler struct {
	employeepb.UnimplementedEmployeeServiceServer
	service *employeeservice.Service
}

func NewEmployeeHandler(service *employeeservice.Service) *EmployeeHandler {
	return &EmployeeHandler{service: service}
}

func (h *EmployeeHandler) CreateEmployee(ctx context.Context, req *employeepb.CreateEmployeeRequest) (*employeepb.Employee, error) {
	return h.service.CreateEmployee(ctx, req)
}

func (h *EmployeeHandler) GetEmployee(ctx context.Context, req *employeepb.GetEmployeeRequest) (*employeepb.Employee, error) {
	return h.service.GetEmployee(ctx, req)
}

func (h *EmployeeHandler) ListEmployees(ctx context.Context, req *employeepb.ListEmployeesRequest) (*employeepb.ListEmployeesResponse, error) {
	return h.service.ListEmployees(ctx, req)
}

func (h *EmployeeHandler) UpdateEmployee(ctx context.Context, req *employeepb.UpdateEmployeeRequest) (*employeepb.Employee, error) {
	return h.service.UpdateEmployee(ctx, req)
}

func (h *EmployeeHandler) DeleteEmployee(ctx context.Context, req *employeepb.DeleteEmployeeRequest) (*emptypb.Empty, error) {
	err := h.service.DeleteEmployee(ctx, req)
	if err != nil {
		return nil, err
	}
	return &emptypb.Empty{}, nil
}

// Register registers the handler with gRPC server
func (h *EmployeeHandler) Register(s *grpc.Server) {
	employeepb.RegisterEmployeeServiceServer(s, h)
}

