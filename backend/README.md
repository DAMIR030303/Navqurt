# AI Boshqaruv Backend

Go tilida yozilgan gRPC backend server.

## 📋 Mundarija

- [Texnologiyalar](#texnologiyalar)
- [Talablar](#talablar)
- [O'rnatish](#ornatish)
- [Ishga tushirish](#ishga-tushirish)
- [Environment Variables](#environment-variables)
- [Database Migration](#database-migration)
- [Development](#development)
- [API Documentation](#api-documentation)

---

## 🚀 Texnologiyalar

| Texnologiya | Versiya | Tavsif |
|-------------|---------|--------|
| **Go** | 1.21+ | Programming language |
| **gRPC** | Latest | API communication protocol |
| **PostgreSQL** | 15+ | Database |
| **JWT** | Latest | Authentication |
| **Protocol Buffers** | Latest | Data serialization |

---

## 📦 Talablar

- Go 1.21 yoki yuqori
- PostgreSQL 15 yoki yuqori
- Protocol Buffers compiler (`protoc`)
- Go protobuf plugins (`protoc-gen-go`, `protoc-gen-go-grpc`)

---

## 🔧 O'rnatish

### 1. Dependencies o'rnatish

```bash
go mod download
```

### 2. Protocol Buffers o'rnatish

```bash
# Ubuntu/Debian
sudo apt-get install protobuf-compiler

# macOS
brew install protobuf

# Arch Linux
sudo pacman -S protobuf
```

### 3. Go protobuf plugins o'rnatish

```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# PATH ga qo'shish
export PATH="$PATH:$(go env GOPATH)/bin"
```

### 4. Environment Variables sozlash

```bash
cp .env.example .env
# Keyin .env faylini tahrirlang
```

---

## 🎬 Ishga tushirish

### Development mode

```bash
# Proto fayllarni generate qilish
make proto

# Server ishga tushirish
go run cmd/server/main.go
```

Server `localhost:50051` portida gRPC server va `localhost:8080` portida HTTP server ishga tushadi.

### Production build

```bash
# Build qilish
go build -o bin/server cmd/server/main.go

# Ishga tushirish
./bin/server
```

### Docker orqali

```bash
# PostgreSQL va Backend server ishga tushirish
docker-compose up -d

# Faqat PostgreSQL
docker-compose up -d postgres
```

---

## 🔐 Environment Variables

`.env` faylida quyidagi o'zgaruvchilar sozlanishi kerak:

### Server Configuration

```env
GRPC_PORT=50051          # gRPC server porti
HTTP_PORT=8080           # HTTP server porti
ENV=development          # Environment (development/production)
```

### Database Configuration

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/ai_boshqaruv?sslmode=disable
```

### Supabase Configuration (ixtiyoriy)

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key-here
```

### JWT Configuration

```env
JWT_SECRET=change-me-in-production-use-strong-random-secret
JWT_EXPIRY=24h           # Token amal qilish muddati
```

### Email Configuration (ixtiyoriy)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Storage Configuration (ixtiyoriy)

```env
STORAGE_TYPE=supabase    # supabase yoki s3
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY=
S3_SECRET_KEY=
```

Batafsil ma'lumot uchun `.env.example` faylini ko'ring.

---

## 🗄️ Database Migration

### Migration fayllarni ishga tushirish

Migration fayllar `migrations/` papkasida joylashgan. Ularni quyidagicha ishga tushirish mumkin:

```bash
# PostgreSQL'ga ulanish
psql -U postgres -d ai_boshqaruv

# Migration fayllarni ketma-ket ishga tushirish
\i migrations/001_initial_schema.sql
\i migrations/002_create_companies.sql
\i migrations/003_create_employees.sql
\i migrations/004_create_company_setup.sql
\i migrations/005_create_navoiyda_bugun_company.sql
```

Yoki to'g'ridan-to'g'ri:

```bash
psql -U postgres -d ai_boshqaruv -f migrations/001_initial_schema.sql
psql -U postgres -d ai_boshqaruv -f migrations/002_create_companies.sql
psql -U postgres -d ai_boshqaruv -f migrations/003_create_employees.sql
psql -U postgres -d ai_boshqaruv -f migrations/004_create_company_setup.sql
psql -U postgres -d ai_boshqaruv -f migrations/005_create_navoiyda_bugun_company.sql
```

### Yangi migration yaratish

Yangi migration fayl yaratish uchun:

1. `migrations/` papkasida yangi fayl yarating
2. Fayl nomini raqam bilan boshlang: `006_yangi_migration.sql`
3. SQL kodlarni yozing
4. Migration'ni ishga tushiring

---

## 💻 Development

### Proto fayllarni generate qilish

```bash
make proto
```

Bu buyruq `api/proto/` papkasidagi barcha `.proto` fayllarni `.pb.go` va `_grpc.pb.go` fayllarga aylantiradi.

### Testlar

```bash
# Barcha testlar
go test ./...

# Ma'lum bir paket uchun
go test ./internal/services/...

# Coverage bilan
go test -cover ./...
```

### Linting

```bash
# gofmt
gofmt -w .

# go vet
go vet ./...
```

### Build

```bash
# Binary fayl yaratish
go build -o bin/server cmd/server/main.go

# Cross-compilation (Linux uchun)
GOOS=linux GOARCH=amd64 go build -o bin/server-linux cmd/server/main.go
```

---

## 📚 API Documentation

### gRPC Services

gRPC API proto fayllar `api/proto/` papkasida joylashgan:

- `auth.proto` - Authentication service
- `employee.proto` - Employee management service
- `position.proto` - Position management service
- `contract.proto` - Contract management service
- `task.proto` - Task management service
- `kpi.proto` - KPI management service
- `attendance.proto` - Attendance tracking service
- `finance.proto` - Finance management service
- `storage.proto` - File storage service

### gRPC Client yaratish

Proto fayllardan client yaratish:

```bash
# Frontend uchun (TypeScript)
# Proto fayllarni frontend ga ko'chirish kerak
# Keyin protoc yoki buf ishlatish mumkin
```

### Testing gRPC API

gRPC API'ni test qilish uchun `grpcurl` yoki `bloomrpc` kabi tool'lardan foydalanish mumkin.

---

## 🏗️ Loyiha Strukturasi

```
backend/
├── api/
│   └── proto/          # Protocol Buffer fayllar
├── cmd/
│   └── server/         # Main entry point
├── internal/
│   ├── auth/          # Authentication logic
│   ├── database/      # Database connection
│   ├── handlers/      # gRPC handlers
│   ├── middleware/    # Middleware functions
│   ├── services/      # Business logic
│   └── utils/         # Utility functions
├── migrations/         # SQL migration fayllar
├── config/            # Configuration
├── Makefile           # Build commands
├── go.mod             # Go dependencies
└── README.md          # Bu fayl
```

---

## 🐛 Xatolarni Tuzatish

### Proto generation xatolari

Agar `make proto` xato bersa:

1. `protoc` o'rnatilganligini tekshiring
2. Go protobuf plugins o'rnatilganligini tekshiring
3. PATH to'g'ri sozlanganligini tekshiring

### Database connection xatolari

1. PostgreSQL ishga tushirilganligini tekshiring
2. `DATABASE_URL` to'g'ri sozlanganligini tekshiring
3. Database yaratilganligini tekshiring

### gRPC server ishga tushmayapti

1. Port band emasligini tekshiring: `lsof -i :50051`
2. Environment variables to'g'ri sozlanganligini tekshiring
3. Log fayllarni ko'ring: `server.log`

---

## 📞 Aloqa

Savollar yoki takliflar bo'lsa:

- GitHub Issues oching
- Email: support@ai-boshqaruv.uz

---

## 📝 Litsenziya

Bu loyiha GNU General Public License v3.0 (GPL-3.0) litsenziyasi ostida tarqatiladi.
