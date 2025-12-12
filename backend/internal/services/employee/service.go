package employee

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"google.golang.org/protobuf/types/known/timestamppb"

	employeepb "ai-boshqaruv-backend/api/proto/employee"
	"ai-boshqaruv-backend/internal/database"
	"ai-boshqaruv-backend/internal/utils"
)

type Service struct {
	db *database.DB
}

func NewService(db *database.DB) *Service {
	return &Service{db: db}
}

// CreateEmployee creates a new employee
func (s *Service) CreateEmployee(ctx context.Context, req *employeepb.CreateEmployeeRequest) (*employeepb.Employee, error) {
	query := `
		INSERT INTO employees (first_name, last_name, email, phone, position, department, location, status, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, 'active', NOW())
		RETURNING id, first_name, last_name, email, phone, position, department, status, avatar_url, performance, is_top_performer, location, join_date, created_at
	`

	var emp employeepb.Employee
	var joinDate, createdAt time.Time

	err := s.db.Pool.QueryRow(ctx, query,
		req.FirstName,
		req.LastName,
		req.Email,
		req.Phone,
		req.Position,
		req.Department,
		req.Location,
	).Scan(
		&emp.Id,
		&emp.FirstName,
		&emp.LastName,
		&emp.Email,
		&emp.Phone,
		&emp.Position,
		&emp.Department,
		&emp.Status,
		&emp.AvatarUrl,
		&emp.Performance,
		&emp.IsTopPerformer,
		&emp.Location,
		&joinDate,
		&createdAt,
	)

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to create employee")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	emp.JoinDate = timestamppb.New(joinDate)
	emp.CreatedAt = timestamppb.New(createdAt)

	return &emp, nil
}

// GetEmployee retrieves an employee by ID
func (s *Service) GetEmployee(ctx context.Context, req *employeepb.GetEmployeeRequest) (*employeepb.Employee, error) {
	query := `
		SELECT id, first_name, last_name, email, phone, position, department, status, avatar_url, performance, is_top_performer, location, join_date, created_at
		FROM employees
		WHERE id = $1
	`

	var emp employeepb.Employee
	var joinDate, createdAt time.Time

	err := s.db.Pool.QueryRow(ctx, query, req.Id).Scan(
		&emp.Id,
		&emp.FirstName,
		&emp.LastName,
		&emp.Email,
		&emp.Phone,
		&emp.Position,
		&emp.Department,
		&emp.Status,
		&emp.AvatarUrl,
		&emp.Performance,
		&emp.IsTopPerformer,
		&emp.Location,
		&joinDate,
		&createdAt,
	)

	if err == pgx.ErrNoRows {
		return nil, utils.ErrNotFound("Employee").ToGRPC()
	}

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get employee")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	emp.JoinDate = timestamppb.New(joinDate)
	emp.CreatedAt = timestamppb.New(createdAt)

	return &emp, nil
}

// ListEmployees lists employees with pagination and filters
func (s *Service) ListEmployees(ctx context.Context, req *employeepb.ListEmployeesRequest) (*employeepb.ListEmployeesResponse, error) {
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
		SELECT id, first_name, last_name, email, phone, position, department, status, avatar_url, performance, is_top_performer, location, join_date, created_at
		FROM employees
		WHERE 1=1
	`
	args := []interface{}{}
	argPos := 1

	if req.Search != "" {
		query += fmt.Sprintf(" AND (first_name ILIKE $%d OR last_name ILIKE $%d OR email ILIKE $%d)", argPos, argPos, argPos)
		args = append(args, "%"+req.Search+"%")
		argPos++
	}

	if req.Department != "" {
		query += fmt.Sprintf(" AND department = $%d", argPos)
		args = append(args, req.Department)
		argPos++
	}

	if req.Status != "" {
		query += fmt.Sprintf(" AND status = $%d", argPos)
		args = append(args, req.Status)
		argPos++
	}

	query += fmt.Sprintf(" ORDER BY created_at DESC LIMIT $%d OFFSET $%d", argPos, argPos+1)
	args = append(args, pageSize, offset)

	rows, err := s.db.Pool.Query(ctx, query, args...)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to list employees")
		return nil, utils.ErrInternal(err).ToGRPC()
	}
	defer rows.Close()

	var employees []*employeepb.Employee
	for rows.Next() {
		var emp employeepb.Employee
		var joinDate, createdAt time.Time

		err := rows.Scan(
			&emp.Id,
			&emp.FirstName,
			&emp.LastName,
			&emp.Email,
			&emp.Phone,
			&emp.Position,
			&emp.Department,
			&emp.Status,
			&emp.AvatarUrl,
			&emp.Performance,
			&emp.IsTopPerformer,
			&emp.Location,
			&joinDate,
			&createdAt,
		)

		if err != nil {
			utils.Logger().Error().Err(err).Msg("Failed to scan employee")
			continue
		}

		emp.JoinDate = timestamppb.New(joinDate)
		emp.CreatedAt = timestamppb.New(createdAt)
		employees = append(employees, &emp)
	}

	// Get total count
	countQuery := "SELECT COUNT(*) FROM employees WHERE 1=1"
	countArgs := []interface{}{}
	countArgPos := 1

	if req.Search != "" {
		countQuery += fmt.Sprintf(" AND (first_name ILIKE $%d OR last_name ILIKE $%d OR email ILIKE $%d)", countArgPos, countArgPos, countArgPos)
		countArgs = append(countArgs, "%"+req.Search+"%")
		countArgPos++
	}

	if req.Department != "" {
		countQuery += fmt.Sprintf(" AND department = $%d", countArgPos)
		countArgs = append(countArgs, req.Department)
		countArgPos++
	}

	if req.Status != "" {
		countQuery += fmt.Sprintf(" AND status = $%d", countArgPos)
		countArgs = append(countArgs, req.Status)
		countArgPos++
	}

	var total int32
	err = s.db.Pool.QueryRow(ctx, countQuery, countArgs...).Scan(&total)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to count employees")
		total = int32(len(employees))
	}

	return &employeepb.ListEmployeesResponse{
		Employees: employees,
		Total:     total,
		Page:      page,
		PageSize:  pageSize,
	}, nil
}

// UpdateEmployee updates an employee
func (s *Service) UpdateEmployee(ctx context.Context, req *employeepb.UpdateEmployeeRequest) (*employeepb.Employee, error) {
	query := `
		UPDATE employees
		SET first_name = COALESCE($2, first_name),
		    last_name = COALESCE($3, last_name),
		    email = COALESCE($4, email),
		    phone = COALESCE($5, phone),
		    position = COALESCE($6, position),
		    department = COALESCE($7, department),
		    status = COALESCE($8, status),
		    location = COALESCE($9, location)
		WHERE id = $1
		RETURNING id, first_name, last_name, email, phone, position, department, status, avatar_url, performance, is_top_performer, location, join_date, created_at
	`

	var emp employeepb.Employee
	var joinDate, createdAt time.Time

	err := s.db.Pool.QueryRow(ctx, query,
		req.Id,
		req.FirstName,
		req.LastName,
		req.Email,
		req.Phone,
		req.Position,
		req.Department,
		req.Status,
		req.Location,
	).Scan(
		&emp.Id,
		&emp.FirstName,
		&emp.LastName,
		&emp.Email,
		&emp.Phone,
		&emp.Position,
		&emp.Department,
		&emp.Status,
		&emp.AvatarUrl,
		&emp.Performance,
		&emp.IsTopPerformer,
		&emp.Location,
		&joinDate,
		&createdAt,
	)

	if err == pgx.ErrNoRows {
		return nil, utils.ErrNotFound("Employee").ToGRPC()
	}

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to update employee")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	emp.JoinDate = timestamppb.New(joinDate)
	emp.CreatedAt = timestamppb.New(createdAt)

	return &emp, nil
}

// DeleteEmployee deletes an employee
func (s *Service) DeleteEmployee(ctx context.Context, req *employeepb.DeleteEmployeeRequest) error {
	query := `DELETE FROM employees WHERE id = $1`

	result, err := s.db.Pool.Exec(ctx, query, req.Id)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to delete employee")
		return utils.ErrInternal(err).ToGRPC()
	}

	if result.RowsAffected() == 0 {
		return utils.ErrNotFound("Employee").ToGRPC()
	}

	return nil
}

