package attendance

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5"
	"google.golang.org/protobuf/types/known/timestamppb"

	attendancepb "ai-boshqaruv-backend/api/proto/attendance"
	"ai-boshqaruv-backend/internal/database"
	"ai-boshqaruv-backend/internal/utils"
)

type Service struct {
	db *database.DB
}

func NewService(db *database.DB) *Service {
	return &Service{db: db}
}

// CheckIn records employee check-in time
func (s *Service) CheckIn(ctx context.Context, req *attendancepb.CheckInRequest) (*attendancepb.Attendance, error) {
	checkInTime := time.Now()
	if req.Timestamp != nil {
		checkInTime = req.Timestamp.AsTime()
	}

	// Determine if late (assuming 9:00 AM is standard start time)
	standardStart := time.Date(checkInTime.Year(), checkInTime.Month(), checkInTime.Day(), 9, 0, 0, 0, checkInTime.Location())
	minutesLate := 0
	status := "on_time"

	if checkInTime.After(standardStart) {
		minutesLate = int(checkInTime.Sub(standardStart).Minutes())
		status = "late"
	}

	// Insert or update attendance
	query := `
		INSERT INTO attendance (employee_id, check_in, status, minutes_late, date)
		VALUES ($1, $2, $3, $4, $5)
		ON CONFLICT (employee_id, date) 
		DO UPDATE SET 
			check_in = EXCLUDED.check_in,
			status = EXCLUDED.status,
			minutes_late = EXCLUDED.minutes_late,
			updated_at = NOW()
		RETURNING id, employee_id, check_in, check_out, status, minutes_late, date, created_at, updated_at
	`

	var att attendancepb.Attendance
	var checkIn, checkOut, date, createdAt, updatedAt time.Time

	err := s.db.Pool.QueryRow(ctx, query,
		req.EmployeeId,
		checkInTime,
		status,
		minutesLate,
		checkInTime.Format("2006-01-02"),
	).Scan(
		&att.Id,
		&att.EmployeeId,
		&checkIn,
		&checkOut,
		&att.Status,
		&att.MinutesLate,
		&date,
		&createdAt,
		&updatedAt,
	)

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to check in")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	att.CheckIn = timestamppb.New(checkIn)
	if !checkOut.IsZero() {
		att.CheckOut = timestamppb.New(checkOut)
	}
	att.Date = timestamppb.New(date)

	return &att, nil
}

// CheckOut records employee check-out time
func (s *Service) CheckOut(ctx context.Context, req *attendancepb.CheckOutRequest) (*attendancepb.Attendance, error) {
	checkOutTime := time.Now()
	if req.Timestamp != nil {
		checkOutTime = req.Timestamp.AsTime()
	}

	// Update attendance
	query := `
		UPDATE attendance
		SET check_out = $1, updated_at = NOW()
		WHERE employee_id = $2 AND date = $3
		RETURNING id, employee_id, check_in, check_out, status, minutes_late, date, created_at, updated_at
	`

	var att attendancepb.Attendance
	var checkIn, checkOut, date, createdAt, updatedAt time.Time

	err := s.db.Pool.QueryRow(ctx, query,
		checkOutTime,
		req.EmployeeId,
		checkOutTime.Format("2006-01-02"),
	).Scan(
		&att.Id,
		&att.EmployeeId,
		&checkIn,
		&checkOut,
		&att.Status,
		&att.MinutesLate,
		&date,
		&createdAt,
		&updatedAt,
	)

	if err == pgx.ErrNoRows {
		return nil, utils.ErrNotFound("Attendance record").ToGRPC()
	}

	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to check out")
		return nil, utils.ErrInternal(err).ToGRPC()
	}

	att.CheckIn = timestamppb.New(checkIn)
	att.CheckOut = timestamppb.New(checkOut)
	att.Date = timestamppb.New(date)

	return &att, nil
}

// GetAttendance retrieves attendance records for a date range
func (s *Service) GetAttendance(ctx context.Context, req *attendancepb.GetAttendanceRequest) (*attendancepb.GetAttendanceResponse, error) {
	startDate := time.Now().AddDate(0, 0, -30) // Default: last 30 days
	endDate := time.Now()

	if req.StartDate != nil {
		startDate = req.StartDate.AsTime()
	}
	if req.EndDate != nil {
		endDate = req.EndDate.AsTime()
	}

	query := `
		SELECT id, employee_id, check_in, check_out, status, minutes_late, date, created_at, updated_at
		FROM attendance
		WHERE employee_id = $1 AND date BETWEEN $2 AND $3
		ORDER BY date DESC
	`

	rows, err := s.db.Pool.Query(ctx, query, req.EmployeeId, startDate.Format("2006-01-02"), endDate.Format("2006-01-02"))
	if err != nil {
		utils.Logger().Error().Err(err).Msg("Failed to get attendance")
		return nil, utils.ErrInternal(err).ToGRPC()
	}
	defer rows.Close()

	var attendances []*attendancepb.Attendance
	var totalDays, presentDays, absentDays, lateDays int32

	for rows.Next() {
		var att attendancepb.Attendance
		var checkIn, checkOut, date, createdAt, updatedAt time.Time

		err := rows.Scan(
			&att.Id,
			&att.EmployeeId,
			&checkIn,
			&checkOut,
			&att.Status,
			&att.MinutesLate,
			&date,
			&createdAt,
			&updatedAt,
		)

		if err != nil {
			utils.Logger().Error().Err(err).Msg("Failed to scan attendance")
			continue
		}

		att.CheckIn = timestamppb.New(checkIn)
		if !checkOut.IsZero() {
			att.CheckOut = timestamppb.New(checkOut)
		}
		att.Date = timestamppb.New(date)

		attendances = append(attendances, &att)

		// Calculate statistics
		totalDays++
		if att.Status == "present" || att.Status == "on_time" || att.Status == "late" {
			presentDays++
		}
		if att.Status == "absent" {
			absentDays++
		}
		if att.Status == "late" {
			lateDays++
		}
	}

	return &attendancepb.GetAttendanceResponse{
		Attendances: attendances,
		TotalDays:   totalDays,
		PresentDays: presentDays,
		AbsentDays:  absentDays,
		LateDays:    lateDays,
	}, nil
}



