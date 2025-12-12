package handlers

import (
	"context"

	"google.golang.org/grpc"

	attendancepb "ai-boshqaruv-backend/api/proto/attendance"
	attendanceservice "ai-boshqaruv-backend/internal/services/attendance"
)

type AttendanceHandler struct {
	attendancepb.UnimplementedAttendanceServiceServer
	service *attendanceservice.Service
}

func NewAttendanceHandler(service *attendanceservice.Service) *AttendanceHandler {
	return &AttendanceHandler{service: service}
}

func (h *AttendanceHandler) CheckIn(ctx context.Context, req *attendancepb.CheckInRequest) (*attendancepb.Attendance, error) {
	return h.service.CheckIn(ctx, req)
}

func (h *AttendanceHandler) CheckOut(ctx context.Context, req *attendancepb.CheckOutRequest) (*attendancepb.Attendance, error) {
	return h.service.CheckOut(ctx, req)
}

func (h *AttendanceHandler) GetAttendance(ctx context.Context, req *attendancepb.GetAttendanceRequest) (*attendancepb.GetAttendanceResponse, error) {
	return h.service.GetAttendance(ctx, req)
}

// Register registers the handler with gRPC server
func (h *AttendanceHandler) Register(s *grpc.Server) {
	attendancepb.RegisterAttendanceServiceServer(s, h)
}



