# gRPC Server Test Qo'llanmasi

## Server holatini tekshirish

```bash
# Server portini tekshirish
ss -tlnp | grep 50051

# yoki
netstat -tlnp | grep 50051
```

## grpcurl orqali tekshirish

### 1. grpcurl o'rnatish

```bash
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
export PATH=$PATH:$(go env GOPATH)/bin
```

### 2. Available servislarni ko'rish

```bash
grpcurl -plaintext localhost:50051 list
```

**Natija:**
- `attendance.AttendanceService`
- `auth.AuthService`
- `employee.EmployeeService`
- `finance.FinanceService`
- `kpi.KPIService`
- `grpc.reflection.v1.ServerReflection`

### 3. Service metodlarini ko'rish

```bash
# Auth Service
grpcurl -plaintext localhost:50051 list auth.AuthService

# Employee Service
grpcurl -plaintext localhost:50051 list employee.EmployeeService

# KPI Service
grpcurl -plaintext localhost:50051 list kpi.KPIService

# Attendance Service
grpcurl -plaintext localhost:50051 list attendance.AttendanceService

# Finance Service
grpcurl -plaintext localhost:50051 list finance.FinanceService
```

### 4. Metodlarni chaqirish

#### Auth Service

```bash
# Register
grpcurl -plaintext -d '{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User",
  "company_name": "Test Company"
}' localhost:50051 auth.AuthService/Register

# Login
grpcurl -plaintext -d '{
  "email": "test@example.com",
  "password": "password123"
}' localhost:50051 auth.AuthService/Login
```

#### Employee Service

```bash
# List Employees
grpcurl -plaintext -d '{
  "page": 1,
  "page_size": 10
}' localhost:50051 employee.EmployeeService/ListEmployees

# Get Employee
grpcurl -plaintext -d '{
  "id": 1
}' localhost:50051 employee.EmployeeService/GetEmployee

# Create Employee
grpcurl -plaintext -d '{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "+998901234567",
  "position": "Developer",
  "department": "IT",
  "location": "Tashkent"
}' localhost:50051 employee.EmployeeService/CreateEmployee
```

#### KPI Service

```bash
# Calculate KPI
grpcurl -plaintext -d '{
  "employee_id": 1,
  "period": "monthly"
}' localhost:50051 kpi.KPIService/CalculateKPI

# Get KPI Metrics
grpcurl -plaintext -d '{
  "employee_id": 1
}' localhost:50051 kpi.KPIService/GetKPIMetrics
```

#### Attendance Service

```bash
# Check In
grpcurl -plaintext -d '{
  "employee_id": 1
}' localhost:50051 attendance.AttendanceService/CheckIn

# Check Out
grpcurl -plaintext -d '{
  "employee_id": 1
}' localhost:50051 attendance.AttendanceService/CheckOut

# Get Attendance
grpcurl -plaintext -d '{
  "employee_id": 1
}' localhost:50051 attendance.AttendanceService/GetAttendance
```

#### Finance Service

```bash
# Calculate Salary
grpcurl -plaintext -d '{
  "employee_id": 1,
  "period": "2024-12"
}' localhost:50051 finance.FinanceService/CalculateSalary

# Get Salary History
grpcurl -plaintext -d '{
  "employee_id": 1,
  "limit": 10
}' localhost:50051 finance.FinanceService/GetSalaryHistory
```

## Test Script

Avtomatik test uchun:

```bash
chmod +x test_grpc.sh
./test_grpc.sh
```

## Server loglarini ko'rish

```bash
tail -f backend/server.log
```

## Muammolarni hal qilish

1. **Server ishlamayapti:**
   ```bash
   cd backend
   export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_boshqaruv?sslmode=disable"
   export GRPC_PORT=50051
   export ENV=development
   export JWT_SECRET="development-secret-key-change-in-production-min-32-chars-long"
   ./bin/server
   ```

2. **grpcurl topilmayapti:**
   ```bash
   go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest
   export PATH=$PATH:$(go env GOPATH)/bin
   ```

3. **Connection refused:**
   - Server ishga tushganligini tekshiring
   - Port 50051 bloklanganligini tekshiring



