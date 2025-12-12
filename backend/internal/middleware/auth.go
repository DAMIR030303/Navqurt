package middleware

import (
	"context"
	"strings"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"

	"ai-boshqaruv-backend/internal/auth"
)

const (
	authorizationHeader = "authorization"
	bearerPrefix        = "Bearer "
)

// AuthInterceptor is a gRPC interceptor for authentication
func AuthInterceptor(jwtManager *auth.JWTManager) grpc.UnaryServerInterceptor {
	return func(
		ctx context.Context,
		req interface{},
		info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler,
	) (interface{}, error) {
		// Skip auth for certain methods (login, register, health check)
		if isPublicMethod(info.FullMethod) {
			return handler(ctx, req)
		}

		md, ok := metadata.FromIncomingContext(ctx)
		if !ok {
			return nil, status.Error(codes.Unauthenticated, "metadata not provided")
		}

		authHeaders := md.Get(authorizationHeader)
		if len(authHeaders) == 0 {
			return nil, status.Error(codes.Unauthenticated, "authorization header not provided")
		}

		token := strings.TrimPrefix(authHeaders[0], bearerPrefix)
		if token == authHeaders[0] {
			return nil, status.Error(codes.Unauthenticated, "invalid authorization header format")
		}

		claims, err := jwtManager.ValidateToken(token)
		if err != nil {
			return nil, status.Error(codes.Unauthenticated, "invalid token")
		}

		// Add claims to context
		ctx = context.WithValue(ctx, "user_id", claims.UserID)
		ctx = context.WithValue(ctx, "email", claims.Email)
		ctx = context.WithValue(ctx, "role", claims.Role)
		ctx = context.WithValue(ctx, "company_id", claims.CompanyID)

		return handler(ctx, req)
	}
}

// isPublicMethod checks if a method is public (doesn't require auth)
func isPublicMethod(fullMethod string) bool {
	publicMethods := []string{
		"/auth.AuthService/Login",
		"/auth.AuthService/Register",
		"/auth.AuthService/ValidateToken",
	}

	for _, method := range publicMethods {
		if fullMethod == method {
			return true
		}
	}

	return false
}



