.PHONY: proto build test run clean

# Protocol buffer compiler
PROTOC = protoc
PROTOC_GEN_GO = protoc-gen-go
PROTOC_GEN_GO_GRPC = protoc-gen-go-grpc

# Directories
PROTO_DIR = api/proto
PROTO_OUT = api/proto

# Generate Go code from proto files
proto:
	@echo "Generating Go code from proto files..."
	@mkdir -p $(PROTO_OUT)/attendance $(PROTO_OUT)/auth $(PROTO_OUT)/employee $(PROTO_OUT)/finance $(PROTO_OUT)/kpi $(PROTO_OUT)/storage $(PROTO_OUT)/position $(PROTO_OUT)/contract $(PROTO_OUT)/task
	@export PATH=$$PATH:$$(go env GOPATH)/bin && \
		$(PROTOC) --go_out=$(PROTO_OUT) --go_opt=paths=source_relative \
		--go-grpc_out=$(PROTO_OUT) --go-grpc_opt=paths=source_relative \
		--proto_path=$(PROTO_DIR) \
		$(PROTO_DIR)/*.proto
	@mv $(PROTO_OUT)/attendance*.pb.go $(PROTO_OUT)/attendance/ 2>/dev/null || true
	@mv $(PROTO_OUT)/auth*.pb.go $(PROTO_OUT)/auth/ 2>/dev/null || true
	@mv $(PROTO_OUT)/employee*.pb.go $(PROTO_OUT)/employee/ 2>/dev/null || true
	@mv $(PROTO_OUT)/finance*.pb.go $(PROTO_OUT)/finance/ 2>/dev/null || true
	@mv $(PROTO_OUT)/kpi*.pb.go $(PROTO_OUT)/kpi/ 2>/dev/null || true
	@mv $(PROTO_OUT)/storage*.pb.go $(PROTO_OUT)/storage/ 2>/dev/null || true
	@mv $(PROTO_OUT)/position*.pb.go $(PROTO_OUT)/position/ 2>/dev/null || true
	@mv $(PROTO_OUT)/contract*.pb.go $(PROTO_OUT)/contract/ 2>/dev/null || true
	@mv $(PROTO_OUT)/task*.pb.go $(PROTO_OUT)/task/ 2>/dev/null || true
	@echo "Proto files generated successfully!"

# Build the server
build:
	@echo "Building server..."
	@go build -o bin/server cmd/server/main.go
	@echo "Build complete!"

# Run tests
test:
	@echo "Running tests..."
	@go test -v ./...

# Run the server
run:
	@echo "Starting server..."
	@go run cmd/server/main.go

# Clean build artifacts
clean:
	@echo "Cleaning..."
	@rm -rf bin/
	@rm -f $(PROTO_OUT)/*.pb.go
	@rm -f $(PROTO_OUT)/*_grpc.pb.go
	@echo "Clean complete!"

# Install dependencies
deps:
	@echo "Installing dependencies..."
	@go mod download
	@go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	@go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
	@echo "Dependencies installed!"


