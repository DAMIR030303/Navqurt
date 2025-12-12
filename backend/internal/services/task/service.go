package task

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"google.golang.org/protobuf/types/known/timestamppb"

	taskpb "ai-boshqaruv-backend/api/proto/task"
	"ai-boshqaruv-backend/internal/database"
	"ai-boshqaruv-backend/internal/utils"
)

type Service struct {
	db *database.DB
}

func NewService(db *database.DB) *Service {
	return &Service{db: db}
}

// CreateTask creates a new daily task
func (s *Service) CreateTask(ctx context.Context, req *taskpb.CreateTaskRequest) (*taskpb.DailyTask, error) {
	query := `
		INSERT INTO daily_tasks (position_id, name, description, frequency, priority, kpi_weight, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
		RETURNING id, position_id, name, description, frequency, priority, kpi_weight, created_at, updated_at
	`

	var task taskpb.DailyTask
	var createdAt, updatedAt time.Time

	err := s.db.Pool.QueryRow(ctx, query,
		req.PositionId,
		req.Name,
		req.Description,
		req.Frequency,
		req.Priority,
		req.KpiWeight,
	).Scan(
		&task.Id,
		&task.PositionId,
		&task.Name,
		&task.Description,
		&task.Frequency,
		&task.Priority,
		&task.KpiWeight,
		&createdAt,
		&updatedAt,
	)

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to create task")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	task.CreatedAt = timestamppb.New(createdAt)
	task.UpdatedAt = timestamppb.New(updatedAt)

	return &task, nil
}

// GetTask retrieves a task by ID
func (s *Service) GetTask(ctx context.Context, req *taskpb.GetTaskRequest) (*taskpb.DailyTask, error) {
	query := `
		SELECT id, position_id, name, description, frequency, priority, kpi_weight, created_at, updated_at
		FROM daily_tasks
		WHERE id = $1
	`

	var task taskpb.DailyTask
	var createdAt, updatedAt time.Time

	err := s.db.Pool.QueryRow(ctx, query, req.Id).Scan(
		&task.Id,
		&task.PositionId,
		&task.Name,
		&task.Description,
		&task.Frequency,
		&task.Priority,
		&task.KpiWeight,
		&createdAt,
		&updatedAt,
	)

	if err == pgx.ErrNoRows {
		return nil, utils.ErrNotFound("Task").ToGRPC()
	}

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get task")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	task.CreatedAt = timestamppb.New(createdAt)
	task.UpdatedAt = timestamppb.New(updatedAt)

	return &task, nil
}

// ListTasks lists tasks with pagination and filters
func (s *Service) ListTasks(ctx context.Context, req *taskpb.ListTasksRequest) (*taskpb.ListTasksResponse, error) {
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
		SELECT id, position_id, name, description, frequency, priority, kpi_weight, created_at, updated_at
		FROM daily_tasks
		WHERE 1=1
	`
	args := []interface{}{}
	argPos := 1

	if req.PositionId > 0 {
		query += fmt.Sprintf(" AND position_id = $%d", argPos)
		args = append(args, req.PositionId)
		argPos++
	}

	if req.Frequency != "" {
		query += fmt.Sprintf(" AND frequency = $%d", argPos)
		args = append(args, req.Frequency)
		argPos++
	}

	query += fmt.Sprintf(" ORDER BY created_at DESC LIMIT $%d OFFSET $%d", argPos, argPos+1)
	args = append(args, pageSize, offset)

	rows, err := s.db.Pool.Query(ctx, query, args...)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to list tasks")
		return nil, utils.ErrInternal(err).ToGRPC()
	}
	defer rows.Close()

	var tasks []*taskpb.DailyTask
	for rows.Next() {
		var task taskpb.DailyTask
		var createdAt, updatedAt time.Time

		err := rows.Scan(
			&task.Id,
			&task.PositionId,
			&task.Name,
			&task.Description,
			&task.Frequency,
			&task.Priority,
			&task.KpiWeight,
			&createdAt,
			&updatedAt,
		)

		if err != nil {
			utils.Logger().Error().Err(err).Msg("Failed to scan task")
			continue
		}

		task.CreatedAt = timestamppb.New(createdAt)
		task.UpdatedAt = timestamppb.New(updatedAt)
		tasks = append(tasks, &task)
	}

	// Get total count
	countQuery := "SELECT COUNT(*) FROM daily_tasks WHERE 1=1"
	countArgs := []interface{}{}
	countArgPos := 1

	if req.PositionId > 0 {
		countQuery += fmt.Sprintf(" AND position_id = $%d", countArgPos)
		countArgs = append(countArgs, req.PositionId)
		countArgPos++
	}

	if req.Frequency != "" {
		countQuery += fmt.Sprintf(" AND frequency = $%d", countArgPos)
		countArgs = append(countArgs, req.Frequency)
		countArgPos++
	}

	var total int32
	err = s.db.Pool.QueryRow(ctx, countQuery, countArgs...).Scan(&total)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to count tasks")
		total = int32(len(tasks))
	}

	return &taskpb.ListTasksResponse{
		Tasks:    tasks,
		Total:    total,
		Page:     page,
		PageSize: pageSize,
	}, nil
}

// UpdateTask updates a task
func (s *Service) UpdateTask(ctx context.Context, req *taskpb.UpdateTaskRequest) (*taskpb.DailyTask, error) {
	query := `
		UPDATE daily_tasks
		SET name = COALESCE($2, name),
		    description = COALESCE($3, description),
		    frequency = COALESCE($4, frequency),
		    priority = COALESCE($5, priority),
		    kpi_weight = COALESCE($6, kpi_weight),
		    updated_at = NOW()
		WHERE id = $1
		RETURNING id, position_id, name, description, frequency, priority, kpi_weight, created_at, updated_at
	`

	var task taskpb.DailyTask
	var createdAt, updatedAt time.Time

	err := s.db.Pool.QueryRow(ctx, query,
		req.Id,
		req.Name,
		req.Description,
		req.Frequency,
		req.Priority,
		req.KpiWeight,
	).Scan(
		&task.Id,
		&task.PositionId,
		&task.Name,
		&task.Description,
		&task.Frequency,
		&task.Priority,
		&task.KpiWeight,
		&createdAt,
		&updatedAt,
	)

	if err == pgx.ErrNoRows {
		return nil, utils.ErrNotFound("Task").ToGRPC()
	}

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to update task")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	task.CreatedAt = timestamppb.New(createdAt)
	task.UpdatedAt = timestamppb.New(updatedAt)

	return &task, nil
}

// DeleteTask deletes a task
func (s *Service) DeleteTask(ctx context.Context, req *taskpb.DeleteTaskRequest) error {
	query := `DELETE FROM daily_tasks WHERE id = $1`

	result, err := s.db.Pool.Exec(ctx, query, req.Id)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to delete task")
		return utils.ErrInternal(err).ToGRPC()
	}

	if result.RowsAffected() == 0 {
		return utils.ErrNotFound("Task").ToGRPC()
	}

	return nil
}

// AssignTask assigns a task to an employee
func (s *Service) AssignTask(ctx context.Context, req *taskpb.AssignTaskRequest) (*taskpb.EmployeeTask, error) {
	query := `
		INSERT INTO employee_tasks (employee_id, task_id, completed_date, status, created_at, updated_at)
		VALUES ($1, $2, $3, 'pending', NOW(), NOW())
		RETURNING id, employee_id, task_id, completed_date, status, quality_score, created_at, updated_at
	`

	var empTask taskpb.EmployeeTask
	var completedDate time.Time
	var createdAt, updatedAt time.Time
	var qualityScore *float64

	err := s.db.Pool.QueryRow(ctx, query,
		req.EmployeeId,
		req.TaskId,
		req.CompletedDate,
	).Scan(
		&empTask.Id,
		&empTask.EmployeeId,
		&empTask.TaskId,
		&completedDate,
		&empTask.Status,
		&qualityScore,
		&createdAt,
		&updatedAt,
	)

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to assign task")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	empTask.CompletedDate = completedDate.Format("2006-01-02")
	if qualityScore != nil {
		empTask.QualityScore = *qualityScore
	}
	empTask.CreatedAt = timestamppb.New(createdAt)
	empTask.UpdatedAt = timestamppb.New(updatedAt)

	return &empTask, nil
}

// CompleteTask marks a task as completed
func (s *Service) CompleteTask(ctx context.Context, req *taskpb.CompleteTaskRequest) (*taskpb.EmployeeTask, error) {
	query := `
		UPDATE employee_tasks
		SET status = COALESCE($2, status),
		    quality_score = COALESCE($3, quality_score),
		    updated_at = NOW()
		WHERE id = $1
		RETURNING id, employee_id, task_id, completed_date, status, quality_score, created_at, updated_at
	`

	var empTask taskpb.EmployeeTask
	var completedDate time.Time
	var createdAt, updatedAt time.Time
	var qualityScore *float64

	err := s.db.Pool.QueryRow(ctx, query,
		req.Id,
		req.Status,
		req.QualityScore,
	).Scan(
		&empTask.Id,
		&empTask.EmployeeId,
		&empTask.TaskId,
		&completedDate,
		&empTask.Status,
		&qualityScore,
		&createdAt,
		&updatedAt,
	)

	if err == pgx.ErrNoRows {
		return nil, utils.ErrNotFound("EmployeeTask").ToGRPC()
	}

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to complete task")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	empTask.CompletedDate = completedDate.Format("2006-01-02")
	if qualityScore != nil {
		empTask.QualityScore = *qualityScore
	}
	empTask.CreatedAt = timestamppb.New(createdAt)
	empTask.UpdatedAt = timestamppb.New(updatedAt)

	return &empTask, nil
}

// GetTaskMetrics retrieves task metrics for an employee
func (s *Service) GetTaskMetrics(ctx context.Context, req *taskpb.GetTaskMetricsRequest) (*taskpb.GetTaskMetricsResponse, error) {
	// Build date filter based on period
	var dateFilter string
	switch req.Period {
	case "daily":
		dateFilter = "completed_date = CURRENT_DATE"
	case "weekly":
		dateFilter = "completed_date >= CURRENT_DATE - INTERVAL '7 days'"
	case "monthly":
		dateFilter = "completed_date >= CURRENT_DATE - INTERVAL '30 days'"
	default:
		dateFilter = "1=1"
	}

	query := fmt.Sprintf(`
		SELECT 
			COUNT(*) as total_tasks,
			COUNT(*) FILTER (WHERE status = 'completed') as completed_tasks,
			COUNT(*) FILTER (WHERE status = 'pending' OR status = 'in_progress') as pending_tasks,
			COUNT(*) FILTER (WHERE status = 'overdue') as overdue_tasks,
			AVG(quality_score) as avg_quality_score
		FROM employee_tasks
		WHERE employee_id = $1 AND %s
	`, dateFilter)

	var totalTasks, completedTasks, pendingTasks, overdueTasks int32
	var avgQualityScore *float64

	err := s.db.Pool.QueryRow(ctx, query, req.EmployeeId).Scan(
		&totalTasks,
		&completedTasks,
		&pendingTasks,
		&overdueTasks,
		&avgQualityScore,
	)

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get task metrics")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	var completionRate float64
	if totalTasks > 0 {
		completionRate = float64(completedTasks) / float64(totalTasks) * 100
	}

	var avgScore float64
	if avgQualityScore != nil {
		avgScore = *avgQualityScore
	}

	return &taskpb.GetTaskMetricsResponse{
		TotalTasks:          totalTasks,
		CompletedTasks:       completedTasks,
		PendingTasks:         pendingTasks,
		OverdueTasks:         overdueTasks,
		AverageQualityScore: avgScore,
		CompletionRate:       completionRate,
	}, nil
}

