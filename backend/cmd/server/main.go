package main

import (
	"flag"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	"ai-boshqaruv-backend/config"
	authpkg "ai-boshqaruv-backend/internal/auth"
	"ai-boshqaruv-backend/internal/database"
	"ai-boshqaruv-backend/internal/handlers"
	"ai-boshqaruv-backend/internal/middleware"
	"ai-boshqaruv-backend/internal/services/attendance"
	authservice "ai-boshqaruv-backend/internal/services/auth"
	"ai-boshqaruv-backend/internal/services/contract"
	"ai-boshqaruv-backend/internal/services/employee"
	"ai-boshqaruv-backend/internal/services/finance"
	"ai-boshqaruv-backend/internal/services/kpi"
	"ai-boshqaruv-backend/internal/services/position"
	"ai-boshqaruv-backend/internal/services/task"
	"ai-boshqaruv-backend/internal/utils"
)

var (
	port = flag.Int("port", 50051, "gRPC server port")
)

func main() {
	flag.Parse()

	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Initialize logger
	utils.InitLogger(cfg.Env)

	// Connect to database
	db, err := database.New(cfg)
	if err != nil {
		utils.Logger().Fatal().Err(err).Msg("Failed to connect to database")
	}
	defer db.Close()

	// Initialize JWT manager
	jwtManager := authpkg.NewJWTManager(cfg)

	// Create gRPC server with auth middleware
	s := grpc.NewServer(
		grpc.UnaryInterceptor(middleware.AuthInterceptor(jwtManager)),
	)

	// Initialize services
	employeeService := employee.NewService(db)
	kpiService := kpi.NewService(db)
	attendanceService := attendance.NewService(db)
	authService := authservice.NewService(db, jwtManager)
	financeService := finance.NewService(db, kpiService, attendanceService)
	positionService := position.NewService(db)
	contractService := contract.NewService(db)
	taskService := task.NewService(db)

	// Initialize handlers
	employeeHandler := handlers.NewEmployeeHandler(employeeService)
	kpiHandler := handlers.NewKPIHandler(kpiService)
	attendanceHandler := handlers.NewAttendanceHandler(attendanceService)
	authHandler := handlers.NewAuthHandler(authService)
	financeHandler := handlers.NewFinanceHandler(financeService)
	positionHandler := handlers.NewPositionHandler(positionService)
	contractHandler := handlers.NewContractHandler(contractService)
	taskHandler := handlers.NewTaskHandler(taskService)

	// Register services
	authHandler.RegisterService(s)        // Auth must be registered first (public endpoints)
	employeeHandler.Register(s)
	kpiHandler.Register(s)
	attendanceHandler.Register(s)
	financeHandler.Register(s)
	positionHandler.Register(s)
	contractHandler.Register(s)
	taskHandler.Register(s)

	// Enable reflection for gRPC CLI tools (development only)
	if cfg.Env == "development" {
		reflection.Register(s)
	}

	// Start server
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		utils.Logger().Fatal().Err(err).Msg("Failed to listen")
	}

	// Graceful shutdown
	go func() {
		sigint := make(chan os.Signal, 1)
		signal.Notify(sigint, os.Interrupt, syscall.SIGTERM)
		<-sigint

		utils.Logger().Info().Msg("Shutting down server...")
		s.GracefulStop()
	}()

	utils.Logger().Info().Int("port", *port).Msg("gRPC server listening")
	if err := s.Serve(lis); err != nil {
		utils.Logger().Fatal().Err(err).Msg("Failed to serve")
	}
}
