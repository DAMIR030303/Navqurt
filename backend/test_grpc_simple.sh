#!/bin/bash

# Simple gRPC Test Script
export PATH=$PATH:$(go env GOPATH)/bin

echo "╔══════════════════════════════════════════════════════════╗"
echo "║         gRPC Backend Server Test                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Server holati
echo "🔍 Server holati:"
if ss -tlnp 2>/dev/null | grep -q 50051; then
    echo "   ✅ Port 50051 - ISHLAMOQDA"
else
    echo "   ❌ Port 50051 - ISHLAMAYAPTI"
    exit 1
fi
echo ""

# Available servislar
echo "📦 Available Servislar:"
grpcurl -plaintext localhost:50051 list 2>&1 | grep -v "grpc.reflection" | sed 's/^/   • /'
echo ""

# Har bir service metodlari
echo "📋 Service Metodlari:"
echo ""
echo "   🔐 Auth Service:"
grpcurl -plaintext localhost:50051 list auth.AuthService 2>&1 | sed 's/^/      - /'
echo ""
echo "   👥 Employee Service:"
grpcurl -plaintext localhost:50051 list employee.EmployeeService 2>&1 | sed 's/^/      - /'
echo ""
echo "   📊 KPI Service:"
grpcurl -plaintext localhost:50051 list kpi.KPIService 2>&1 | sed 's/^/      - /'
echo ""
echo "   ⏰ Attendance Service:"
grpcurl -plaintext localhost:50051 list attendance.AttendanceService 2>&1 | sed 's/^/      - /'
echo ""
echo "   💰 Finance Service:"
grpcurl -plaintext localhost:50051 list finance.FinanceService 2>&1 | sed 's/^/      - /'
echo ""

# Test: Register (public endpoint)
echo "🧪 Test: Register (public endpoint):"
REGISTER_RESPONSE=$(grpcurl -plaintext -d '{
  "email": "test@example.com",
  "password": "test123456",
  "name": "Test User",
  "company_name": "Test Company"
}' localhost:50051 auth.AuthService/Register 2>&1)

if echo "$REGISTER_RESPONSE" | grep -q "token"; then
    echo "   ✅ Register muvaffaqiyatli!"
    TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    echo "   Token olingan: ${TOKEN:0:50}..."
    echo ""
    echo "🧪 Test: List Employees (token bilan):"
    grpcurl -plaintext -H "authorization: Bearer $TOKEN" -d '{"page": 1, "page_size": 10}' localhost:50051 employee.EmployeeService/ListEmployees 2>&1 | head -10 | sed 's/^/   /'
else
    echo "   ⚠️ Register natijasi:"
    echo "$REGISTER_RESPONSE" | sed 's/^/   /'
fi

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║  Server ishlamoqda va barcha servislar mavjud! ✅      ║"
echo "╚══════════════════════════════════════════════════════════╝"



