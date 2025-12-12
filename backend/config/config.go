package config

import (
	"os"
	"strconv"
	"time"
)

type Config struct {
	// Server
	GRPCPort int
	HTTPPort int
	Env      string

	// Database
	DatabaseURL string
	SupabaseURL string
	SupabaseKey string

	// Auth
	JWTSecret string
	JWTExpiry time.Duration

	// Email
	SMTPHost string
	SMTPPort int
	SMTPUser string
	SMTPPass string

	// Storage
	StorageType string
	S3Bucket    string
	S3Region    string
	S3AccessKey string
	S3SecretKey string
}

func Load() (*Config, error) {
	cfg := &Config{
		GRPCPort:    getEnvAsInt("GRPC_PORT", 50051),
		HTTPPort:    getEnvAsInt("HTTP_PORT", 8080),
		Env:         getEnv("ENV", "development"),
		DatabaseURL: getEnv("DATABASE_URL", ""),
		SupabaseURL: getEnv("SUPABASE_URL", ""),
		SupabaseKey: getEnv("SUPABASE_KEY", ""),
		JWTSecret:   getEnv("JWT_SECRET", "change-me-in-production"),
		StorageType: getEnv("STORAGE_TYPE", "supabase"),
		SMTPHost:    getEnv("SMTP_HOST", ""),
		SMTPPort:    getEnvAsInt("SMTP_PORT", 587),
		SMTPUser:    getEnv("SMTP_USER", ""),
		SMTPPass:    getEnv("SMTP_PASS", ""),
		S3Bucket:    getEnv("S3_BUCKET", ""),
		S3Region:    getEnv("S3_REGION", ""),
		S3AccessKey: getEnv("S3_ACCESS_KEY", ""),
		S3SecretKey: getEnv("S3_SECRET_KEY", ""),
	}

	// Parse JWT expiry
	jwtExpiryStr := getEnv("JWT_EXPIRY", "24h")
	duration, err := time.ParseDuration(jwtExpiryStr)
	if err != nil {
		duration = 24 * time.Hour
	}
	cfg.JWTExpiry = duration

	return cfg, nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	valueStr := os.Getenv(key)
	if valueStr == "" {
		return defaultValue
	}
	value, err := strconv.Atoi(valueStr)
	if err != nil {
		return defaultValue
	}
	return value
}

