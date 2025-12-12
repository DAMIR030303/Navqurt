#!/bin/bash

# gRPC Server Test Script
# Bu script backend gRPC serverni tekshirish uchun

export PATH=$PATH:$(go env GOPATH)/bin

echo "=== gRPC Server Test ==="
echo ""

# 1. Server holatini tekshirish
echo "1. Server holatini tekshirish..."
if ss -tlnp 2>/dev/null | grep -q 50051; then
    echo "   ✅ Server port 50051 da eshitmoqda"
else
    echo "   ❌ Server ishlamayapti"
    exit 1
fi

echo ""

# 2. Available servislarni ko'rish
echo "2. Available servislar:"
grpcurl -plaintext localhost:50051 list 2>&1 | sed 's/^/   /'
echo ""

# 3. Auth Service metodlari
echo "3. Auth Service metodlari:"
grpcurl -plaintext localhost:50051 list ai-boshqaruv-backend.api.proto.auth.AuthService 2>&1 | sed 's/^/   /'
echo ""

# 4. Employee Service metodlari
echo "4. Employee Service metodlari:"
grpcurl -plaintext localhost:50051 list ai-boshqaruv-backend.api.proto.employee.EmployeeService 2>&1 | sed 's/^/   /'
echo ""

# 5. KPI Service metodlari
echo "5. KPI Service metodlari:"
grpcurl -plaintext localhost:50051 list ai-boshqaruv-backend.api.proto.kpi.KPIService 2>&1 | sed 's/^/   /'
echo ""

# 6. Attendance Service metodlari
echo "6. Attendance Service metodlari:"
grpcurl -plaintext localhost:50051 list ai-boshqaruv-backend.api.proto.attendance.AttendanceService 2>&1 | sed 's/^/   /'
echo ""

# 7. Finance Service metodlari
echo "7. Finance Service metodlari:"
grpcurl -plaintext localhost:50051 list ai-boshqaruv-backend.api.proto.finance.FinanceService 2>&1 | sed 's/^/   /'
echo ""

# 8. Test: List Employees (agar database bo'sh bo'lsa, xato chiqishi mumkin)
echo "8. Test: List Employees:"
grpcurl -plaintext -d '{"page": 1, "page_size": 10}' localhost:50051 ai-boshqaruv-backend.api.proto.employee.EmployeeService/ListEmployees 2>&1 | head -10 | sed 's/^/   /'
echo ""

echo "=== Test yakunlandi ==="



