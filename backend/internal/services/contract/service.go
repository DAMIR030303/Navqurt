package contract

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"google.golang.org/protobuf/types/known/timestamppb"

	contractpb "ai-boshqaruv-backend/api/proto/contract"
	"ai-boshqaruv-backend/internal/database"
	"ai-boshqaruv-backend/internal/utils"
)

type Service struct {
	db *database.DB
}

func NewService(db *database.DB) *Service {
	return &Service{db: db}
}

// CreateContract creates a new contract
func (s *Service) CreateContract(ctx context.Context, req *contractpb.CreateContractRequest) (*contractpb.Contract, error) {
	query := `
		INSERT INTO contracts (employee_id, position_id, contract_type, start_date, end_date, probation_period_days, terms_json, created_at, updated_at)
		VALUES ($1, $2, $3, $4, NULLIF($5, ''), $6, COALESCE($7::jsonb, '{}'::jsonb), NOW(), NOW())
		RETURNING id, employee_id, position_id, contract_type, start_date, end_date, probation_period_days, terms_json::text, created_at, updated_at
	`

	var contract contractpb.Contract
	var startDate, endDate *time.Time
	var createdAt, updatedAt time.Time
	var termsJSON string

	err := s.db.Pool.QueryRow(ctx, query,
		req.EmployeeId,
		req.PositionId,
		req.ContractType,
		req.StartDate,
		req.EndDate,
		req.ProbationPeriodDays,
		req.TermsJson,
	).Scan(
		&contract.Id,
		&contract.EmployeeId,
		&contract.PositionId,
		&contract.ContractType,
		&startDate,
		&endDate,
		&contract.ProbationPeriodDays,
		&termsJSON,
		&createdAt,
		&updatedAt,
	)

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to create contract")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	if startDate != nil {
		contract.StartDate = startDate.Format("2006-01-02")
	}
	if endDate != nil {
		contract.EndDate = endDate.Format("2006-01-02")
	}
	contract.TermsJson = termsJSON
	contract.CreatedAt = timestamppb.New(createdAt)
	contract.UpdatedAt = timestamppb.New(updatedAt)

	return &contract, nil
}

// GetContract retrieves a contract by ID
func (s *Service) GetContract(ctx context.Context, req *contractpb.GetContractRequest) (*contractpb.Contract, error) {
	query := `
		SELECT id, employee_id, position_id, contract_type, start_date, end_date, probation_period_days, terms_json::text, created_at, updated_at
		FROM contracts
		WHERE id = $1
	`

	var contract contractpb.Contract
	var startDate, endDate *time.Time
	var createdAt, updatedAt time.Time
	var termsJSON string

	err := s.db.Pool.QueryRow(ctx, query, req.Id).Scan(
		&contract.Id,
		&contract.EmployeeId,
		&contract.PositionId,
		&contract.ContractType,
		&startDate,
		&endDate,
		&contract.ProbationPeriodDays,
		&termsJSON,
		&createdAt,
		&updatedAt,
	)

	if err == pgx.ErrNoRows {
		return nil, utils.ErrNotFound("Contract").ToGRPC()
	}

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get contract")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	if startDate != nil {
		contract.StartDate = startDate.Format("2006-01-02")
	}
	if endDate != nil {
		contract.EndDate = endDate.Format("2006-01-02")
	}
	contract.TermsJson = termsJSON
	contract.CreatedAt = timestamppb.New(createdAt)
	contract.UpdatedAt = timestamppb.New(updatedAt)

	return &contract, nil
}

// ListContracts lists contracts with pagination and filters
func (s *Service) ListContracts(ctx context.Context, req *contractpb.ListContractsRequest) (*contractpb.ListContractsResponse, error) {
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
		SELECT id, employee_id, position_id, contract_type, start_date, end_date, probation_period_days, terms_json::text, created_at, updated_at
		FROM contracts
		WHERE 1=1
	`
	args := []interface{}{}
	argPos := 1

	if req.EmployeeId > 0 {
		query += fmt.Sprintf(" AND employee_id = $%d", argPos)
		args = append(args, req.EmployeeId)
		argPos++
	}

	if req.PositionId > 0 {
		query += fmt.Sprintf(" AND position_id = $%d", argPos)
		args = append(args, req.PositionId)
		argPos++
	}

	query += fmt.Sprintf(" ORDER BY created_at DESC LIMIT $%d OFFSET $%d", argPos, argPos+1)
	args = append(args, pageSize, offset)

	rows, err := s.db.Pool.Query(ctx, query, args...)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to list contracts")
		return nil, utils.ErrInternal(err).ToGRPC()
	}
	defer rows.Close()

	var contracts []*contractpb.Contract
	for rows.Next() {
		var contract contractpb.Contract
		var startDate, endDate *time.Time
		var createdAt, updatedAt time.Time
		var termsJSON string

		err := rows.Scan(
			&contract.Id,
			&contract.EmployeeId,
			&contract.PositionId,
			&contract.ContractType,
			&startDate,
			&endDate,
			&contract.ProbationPeriodDays,
			&termsJSON,
			&createdAt,
			&updatedAt,
		)

		if err != nil {
			utils.Logger().Error().Err(err).Msg("Failed to scan contract")
			continue
		}

		if startDate != nil {
			contract.StartDate = startDate.Format("2006-01-02")
		}
		if endDate != nil {
			contract.EndDate = endDate.Format("2006-01-02")
		}
		contract.TermsJson = termsJSON
		contract.CreatedAt = timestamppb.New(createdAt)
		contract.UpdatedAt = timestamppb.New(updatedAt)
		contracts = append(contracts, &contract)
	}

	// Get total count
	countQuery := "SELECT COUNT(*) FROM contracts WHERE 1=1"
	countArgs := []interface{}{}
	countArgPos := 1

	if req.EmployeeId > 0 {
		countQuery += fmt.Sprintf(" AND employee_id = $%d", countArgPos)
		countArgs = append(countArgs, req.EmployeeId)
		countArgPos++
	}

	if req.PositionId > 0 {
		countQuery += fmt.Sprintf(" AND position_id = $%d", countArgPos)
		countArgs = append(countArgs, req.PositionId)
		countArgPos++
	}

	var total int32
	err = s.db.Pool.QueryRow(ctx, countQuery, countArgs...).Scan(&total)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to count contracts")
		total = int32(len(contracts))
	}

	return &contractpb.ListContractsResponse{
		Contracts: contracts,
		Total:     total,
		Page:      page,
		PageSize:  pageSize,
	}, nil
}

// UpdateContract updates a contract
func (s *Service) UpdateContract(ctx context.Context, req *contractpb.UpdateContractRequest) (*contractpb.Contract, error) {
	query := `
		UPDATE contracts
		SET contract_type = COALESCE($2, contract_type),
		    start_date = COALESCE(NULLIF($3, ''), start_date),
		    end_date = COALESCE(NULLIF($4, ''), end_date),
		    probation_period_days = COALESCE($5, probation_period_days),
		    terms_json = COALESCE($6::jsonb, terms_json),
		    updated_at = NOW()
		WHERE id = $1
		RETURNING id, employee_id, position_id, contract_type, start_date, end_date, probation_period_days, terms_json::text, created_at, updated_at
	`

	var contract contractpb.Contract
	var startDate, endDate *time.Time
	var createdAt, updatedAt time.Time
	var termsJSON string

	err := s.db.Pool.QueryRow(ctx, query,
		req.Id,
		req.ContractType,
		req.StartDate,
		req.EndDate,
		req.ProbationPeriodDays,
		req.TermsJson,
	).Scan(
		&contract.Id,
		&contract.EmployeeId,
		&contract.PositionId,
		&contract.ContractType,
		&startDate,
		&endDate,
		&contract.ProbationPeriodDays,
		&termsJSON,
		&createdAt,
		&updatedAt,
	)

	if err == pgx.ErrNoRows {
		return nil, utils.ErrNotFound("Contract").ToGRPC()
	}

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to update contract")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	if startDate != nil {
		contract.StartDate = startDate.Format("2006-01-02")
	}
	if endDate != nil {
		contract.EndDate = endDate.Format("2006-01-02")
	}
	contract.TermsJson = termsJSON
	contract.CreatedAt = timestamppb.New(createdAt)
	contract.UpdatedAt = timestamppb.New(updatedAt)

	return &contract, nil
}

// DeleteContract deletes a contract
func (s *Service) DeleteContract(ctx context.Context, req *contractpb.DeleteContractRequest) error {
	query := `DELETE FROM contracts WHERE id = $1`

	result, err := s.db.Pool.Exec(ctx, query, req.Id)
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to delete contract")
		return utils.ErrInternal(err).ToGRPC()
	}

	if result.RowsAffected() == 0 {
		return utils.ErrNotFound("Contract").ToGRPC()
	}

	return nil
}

