package utils

import (
	"fmt"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// AppError represents an application error
type AppError struct {
	Code    codes.Code
	Message string
	Err     error
}

func (e *AppError) Error() string {
	if e.Err != nil {
		return fmt.Sprintf("%s: %v", e.Message, e.Err)
	}
	return e.Message
}

// ToGRPC converts AppError to gRPC status
func (e *AppError) ToGRPC() error {
	return status.Error(e.Code, e.Message)
}

// NewError creates a new AppError
func NewError(code codes.Code, message string, err error) *AppError {
	return &AppError{
		Code:    code,
		Message: message,
		Err:     err,
	}
}

// Common error constructors
func ErrNotFound(resource string) *AppError {
	return NewError(codes.NotFound, fmt.Sprintf("%s not found", resource), nil)
}

func ErrInvalidArgument(message string) *AppError {
	return NewError(codes.InvalidArgument, message, nil)
}

func ErrUnauthenticated(message string) *AppError {
	return NewError(codes.Unauthenticated, message, nil)
}

func ErrPermissionDenied(message string) *AppError {
	return NewError(codes.PermissionDenied, message, nil)
}

func ErrInternal(err error) *AppError {
	return NewError(codes.Internal, "Internal server error", err)
}



