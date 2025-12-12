package handlers

import (
	"context"

	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"

	taskpb "ai-boshqaruv-backend/api/proto/task"
	taskservice "ai-boshqaruv-backend/internal/services/task"
)

type TaskHandler struct {
	taskpb.UnimplementedTaskServiceServer
	service *taskservice.Service
}

func NewTaskHandler(service *taskservice.Service) *TaskHandler {
	return &TaskHandler{service: service}
}

func (h *TaskHandler) CreateTask(ctx context.Context, req *taskpb.CreateTaskRequest) (*taskpb.DailyTask, error) {
	return h.service.CreateTask(ctx, req)
}

func (h *TaskHandler) GetTask(ctx context.Context, req *taskpb.GetTaskRequest) (*taskpb.DailyTask, error) {
	return h.service.GetTask(ctx, req)
}

func (h *TaskHandler) ListTasks(ctx context.Context, req *taskpb.ListTasksRequest) (*taskpb.ListTasksResponse, error) {
	return h.service.ListTasks(ctx, req)
}

func (h *TaskHandler) UpdateTask(ctx context.Context, req *taskpb.UpdateTaskRequest) (*taskpb.DailyTask, error) {
	return h.service.UpdateTask(ctx, req)
}

func (h *TaskHandler) DeleteTask(ctx context.Context, req *taskpb.DeleteTaskRequest) (*emptypb.Empty, error) {
	err := h.service.DeleteTask(ctx, req)
	if err != nil {
		return nil, err
	}
	return &emptypb.Empty{}, nil
}

func (h *TaskHandler) AssignTask(ctx context.Context, req *taskpb.AssignTaskRequest) (*taskpb.EmployeeTask, error) {
	return h.service.AssignTask(ctx, req)
}

func (h *TaskHandler) CompleteTask(ctx context.Context, req *taskpb.CompleteTaskRequest) (*taskpb.EmployeeTask, error) {
	return h.service.CompleteTask(ctx, req)
}

func (h *TaskHandler) GetTaskMetrics(ctx context.Context, req *taskpb.GetTaskMetricsRequest) (*taskpb.GetTaskMetricsResponse, error) {
	return h.service.GetTaskMetrics(ctx, req)
}

// Register registers the handler with gRPC server
func (h *TaskHandler) Register(s *grpc.Server) {
	taskpb.RegisterTaskServiceServer(s, h)
}

