package finance

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"google.golang.org/protobuf/types/known/timestamppb"

	financepb "ai-boshqaruv-backend/api/proto/finance"
	kpipb "ai-boshqaruv-backend/api/proto/kpi"
	"ai-boshqaruv-backend/internal/database"
	"ai-boshqaruv-backend/internal/services/attendance"
	"ai-boshqaruv-backend/internal/services/kpi"
	"ai-boshqaruv-backend/internal/utils"
)

type Service struct {
	db           *database.DB
	kpiService   *kpi.Service
	attService   *attendance.Service
}

func NewService(db *database.DB, kpiService *kpi.Service, attService *attendance.Service) *Service {
	return &Service{
		db:         db,
		kpiService: kpiService,
		attService: attService,
	}
}

// CalculateSalary calculates employee salary for a period
func (s *Service) CalculateSalary(ctx context.Context, req *financepb.CalculateSalaryRequest) (*financepb.CalculateSalaryResponse, error) {
	// Get salary settings
	var baseSalary, kpiPercentage, attendancePercentage float64
	settingsQuery := `
		SELECT base_salary, kpi_percentage, attendance_percentage
		FROM salary_settings
		WHERE employee_id = $1
	`

	err := s.db.Pool.QueryRow(ctx, settingsQuery, req.EmployeeId).Scan(
		&baseSalary,
		&kpiPercentage,
		&attendancePercentage,
	)

	if err == pgx.ErrNoRows {
		// Default values if no settings found
		baseSalary = 5000000.0
		kpiPercentage = 15.0
		attendancePercentage = 5.0
	} else if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get salary settings")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	// Get KPI score for the period
	// Note: KPI service expects period format like "monthly", "weekly", "daily"
	// Finance service uses "YYYY-MM" format, so we convert it
	periodType := "monthly" // Default to monthly for salary calculation
	kpiResp, err := s.kpiService.CalculateKPI(ctx, &kpipb.CalculateKPIRequest{
		EmployeeId: req.EmployeeId,
		Period:     periodType,
	})
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get KPI")
		// Continue with 0 KPI bonus if error
	}

	kpiScore := 0.0
	if kpiResp != nil && kpiResp.Kpi != nil {
		kpiScore = kpiResp.Kpi.OverallScore
	}

	// Calculate KPI bonus (if KPI >= 90%)
	kpiBonus := 0.0
	if kpiScore >= 90 {
		kpiBonus = baseSalary * (kpiPercentage / 100.0)
	}

	// Get attendance for the period (simplified - assuming 100% attendance bonus)
	// In production, you'd calculate actual attendance percentage
	attendanceBonus := baseSalary * (attendancePercentage / 100.0)

	// Get penalties (simplified - in production, calculate from attendance late days)
	penalties := 0.0

	// Calculate total
	total := baseSalary + kpiBonus + attendanceBonus - penalties

	// Save or update salary record
	salaryQuery := `
		INSERT INTO salaries (employee_id, base_salary, kpi_bonus, attendance_bonus, penalties, total, period)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		ON CONFLICT (employee_id, period)
		DO UPDATE SET
			base_salary = EXCLUDED.base_salary,
			kpi_bonus = EXCLUDED.kpi_bonus,
			attendance_bonus = EXCLUDED.attendance_bonus,
			penalties = EXCLUDED.penalties,
			total = EXCLUDED.total
		RETURNING id, created_at
	`

	var salaryID int64
	var createdAt time.Time
	err = s.db.Pool.QueryRow(ctx, salaryQuery,
		req.EmployeeId,
		baseSalary,
		kpiBonus,
		attendanceBonus,
		penalties,
		total,
		req.Period,
	).Scan(&salaryID, &createdAt)

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to save salary")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	formulaBreakdown := fmt.Sprintf(
		"Jami maosh = %.0f (asosiy) + %.0f (KPI bonus) + %.0f (davomat bonus) - %.0f (jarimalar) = %.0f so'm",
		baseSalary, kpiBonus, attendanceBonus, penalties, total,
	)

	return &financepb.CalculateSalaryResponse{
		Salary: &financepb.Salary{
			Id:              salaryID,
			EmployeeId:     req.EmployeeId,
			BaseSalary:     baseSalary,
			KpiBonus:       kpiBonus,
			AttendanceBonus: attendanceBonus,
			Penalties:      penalties,
			Total:          total,
			Period:         req.Period,
			CreatedAt:      timestamppb.New(createdAt),
		},
		FormulaBreakdown: formulaBreakdown,
	}, nil
}

// GetSalaryHistory retrieves salary history for an employee
func (s *Service) GetSalaryHistory(ctx context.Context, req *financepb.GetSalaryHistoryRequest) (*financepb.GetSalaryHistoryResponse, error) {
	limit := req.Limit
	if limit < 1 || limit > 100 {
		limit = 20
	}

	query := `
		SELECT id, employee_id, base_salary, kpi_bonus, attendance_bonus, penalties, total, period, created_at
		FROM salaries
		WHERE employee_id = $1
		ORDER BY period DESC
		LIMIT $2
	`

	rows, err := s.db.Pool.Query(ctx, query, req.EmployeeId, limit)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get salary history")
		return nil, utils.ErrInternal(err).ToGRPC()
	}
	defer rows.Close()

	var salaries []*financepb.Salary
	for rows.Next() {
		var sal financepb.Salary
		var createdAt time.Time

		err := rows.Scan(
			&sal.Id,
			&sal.EmployeeId,
			&sal.BaseSalary,
			&sal.KpiBonus,
			&sal.AttendanceBonus,
			&sal.Penalties,
			&sal.Total,
			&sal.Period,
			&createdAt,
		)

		if err != nil {
			utils.Logger().Error().Err(err).Msg("Failed to scan salary")
			continue
		}

		sal.CreatedAt = timestamppb.New(createdAt)
		salaries = append(salaries, &sal)
	}

	return &financepb.GetSalaryHistoryResponse{
		Salaries: salaries,
	}, nil
}

// GetTransactions retrieves financial transactions
func (s *Service) GetTransactions(ctx context.Context, req *financepb.GetTransactionsRequest) (*financepb.GetTransactionsResponse, error) {
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
		SELECT id, company_id, type, amount, description, category, date, created_at
		FROM transactions
		WHERE company_id = $1
	`
	args := []interface{}{req.CompanyId}
	argPos := 2

	if req.Type != "" {
		query += fmt.Sprintf(" AND type = $%d", argPos)
		args = append(args, req.Type)
		argPos++
	}

	if req.StartDate != nil {
		query += fmt.Sprintf(" AND date >= $%d", argPos)
		args = append(args, req.StartDate.AsTime().Format("2006-01-02"))
		argPos++
	}

	if req.EndDate != nil {
		query += fmt.Sprintf(" AND date <= $%d", argPos)
		args = append(args, req.EndDate.AsTime().Format("2006-01-02"))
		argPos++
	}

	query += fmt.Sprintf(" ORDER BY date DESC LIMIT $%d OFFSET $%d", argPos, argPos+1)
	args = append(args, pageSize, offset)

	rows, err := s.db.Pool.Query(ctx, query, args...)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get transactions")
		return nil, utils.ErrInternal(err).ToGRPC()
	}
	defer rows.Close()

	var transactions []*financepb.Transaction
	for rows.Next() {
		var trans financepb.Transaction
		var date, createdAt time.Time

		err := rows.Scan(
			&trans.Id,
			&trans.CompanyId,
			&trans.Type,
			&trans.Amount,
			&trans.Description,
			&trans.Category,
			&date,
			&createdAt,
		)

		if err != nil {
			utils.Logger().Error().Err(err).Msg("Failed to scan transaction")
			continue
		}

		trans.Date = timestamppb.New(date)
		trans.CreatedAt = timestamppb.New(createdAt)
		transactions = append(transactions, &trans)
	}

	// Get total count
	countQuery := "SELECT COUNT(*) FROM transactions WHERE company_id = $1"
	countArgs := []interface{}{req.CompanyId}
	countArgPos := 2

	if req.Type != "" {
		countQuery += fmt.Sprintf(" AND type = $%d", countArgPos)
		countArgs = append(countArgs, req.Type)
		countArgPos++
	}

	if req.StartDate != nil {
		countQuery += fmt.Sprintf(" AND date >= $%d", countArgPos)
		countArgs = append(countArgs, req.StartDate.AsTime().Format("2006-01-02"))
		countArgPos++
	}

	if req.EndDate != nil {
		countQuery += fmt.Sprintf(" AND date <= $%d", countArgPos)
		countArgs = append(countArgs, req.EndDate.AsTime().Format("2006-01-02"))
		countArgPos++
	}

	var total int32
	err = s.db.Pool.QueryRow(ctx, countQuery, countArgs...).Scan(&total)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to count transactions")
		total = int32(len(transactions))
	}

	return &financepb.GetTransactionsResponse{
		Transactions: transactions,
		Total:        total,
		Page:         page,
		PageSize:     pageSize,
	}, nil
}

// GetReports generates financial reports
func (s *Service) GetReports(ctx context.Context, req *financepb.GetReportsRequest) (*financepb.GetReportsResponse, error) {
	startDate := time.Now().AddDate(0, -1, 0) // Default: last month
	endDate := time.Now()

	if req.StartDate != nil {
		startDate = req.StartDate.AsTime()
	}
	if req.EndDate != nil {
		endDate = req.EndDate.AsTime()
	}

	// Get income and expense totals
	incomeQuery := `
		SELECT COALESCE(SUM(amount), 0)
		FROM transactions
		WHERE company_id = $1 AND type = 'income' AND date BETWEEN $2 AND $3
	`

	var totalIncome float64
	err := s.db.Pool.QueryRow(ctx, incomeQuery, req.CompanyId, startDate.Format("2006-01-02"), endDate.Format("2006-01-02")).Scan(&totalIncome)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get income")
		totalIncome = 0
	}

	expenseQuery := `
		SELECT COALESCE(SUM(amount), 0)
		FROM transactions
		WHERE company_id = $1 AND type = 'expense' AND date BETWEEN $2 AND $3
	`

	var totalExpense float64
	err = s.db.Pool.QueryRow(ctx, expenseQuery, req.CompanyId, startDate.Format("2006-01-02"), endDate.Format("2006-01-02")).Scan(&totalExpense)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get expense")
		totalExpense = 0
	}

	// Get total salaries
	salaryQuery := `
		SELECT COALESCE(SUM(total), 0)
		FROM salaries
		WHERE period >= $1 AND period <= $2
	`

	var totalSalaries float64
	startPeriod := startDate.Format("2006-01")
	endPeriod := endDate.Format("2006-01")
	err = s.db.Pool.QueryRow(ctx, salaryQuery, startPeriod, endPeriod).Scan(&totalSalaries)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get salaries")
		totalSalaries = 0
	}

	// Get top expenses
	topExpensesQuery := `
		SELECT id, company_id, type, amount, description, category, date, created_at
		FROM transactions
		WHERE company_id = $1 AND type = 'expense' AND date BETWEEN $2 AND $3
		ORDER BY amount DESC
		LIMIT 10
	`

	rows, err := s.db.Pool.Query(ctx, topExpensesQuery, req.CompanyId, startDate.Format("2006-01-02"), endDate.Format("2006-01-02"))
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get top expenses")
	}

	var topExpenses []*financepb.Transaction
	if err == nil {
		defer rows.Close()
		for rows.Next() {
			var trans financepb.Transaction
			var date, createdAt time.Time

			err := rows.Scan(
				&trans.Id,
				&trans.CompanyId,
				&trans.Type,
				&trans.Amount,
				&trans.Description,
				&trans.Category,
				&date,
				&createdAt,
			)

			if err != nil {
				continue
			}

			trans.Date = timestamppb.New(date)
			trans.CreatedAt = timestamppb.New(createdAt)
			topExpenses = append(topExpenses, &trans)
		}
	}

	balance := totalIncome - totalExpense

	return &financepb.GetReportsResponse{
		TotalIncome:   totalIncome,
		TotalExpense:  totalExpense,
		Balance:       balance,
		TotalSalaries: totalSalaries,
		TopExpenses:   topExpenses,
	}, nil
}

