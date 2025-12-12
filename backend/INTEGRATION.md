# Frontend Integratsiya

## gRPC-Web yoki REST Gateway

Frontend (Next.js) bilan integratsiya uchun ikkita variant:

### Variant 1: gRPC-Web (Tavsiya etiladi)

gRPC-Web orqali to'g'ridan-to'g'ri ulanish:

```bash
# Frontend da
npm install @grpc/grpc-js @grpc/grpc-web
```

### Variant 2: REST Gateway (Oddiy)

gRPC-Gateway orqali REST API proxy:

```bash
# Backend da
go get github.com/grpc-ecosystem/grpc-gateway/v2
```

## Frontend Client Yaratish

### 1. Proto fayllarni frontend ga ko'chirish

```bash
cp backend/api/proto/*.proto frontend/proto/
```

### 2. gRPC client yaratish

```typescript
// frontend/lib/grpc-client.ts
import { EmployeeServiceClient } from './proto/employee_grpc_web_pb';
import { EmployeeService } from './proto/employee_pb';

const client = new EmployeeServiceClient('http://localhost:8080');
```

### 3. REST Gateway ishlatish (agar REST tanlasangiz)

```typescript
// frontend/lib/api-client.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});
```

## Environment Variables

Frontend `.env.local`:

```env
NEXT_PUBLIC_GRPC_URL=http://localhost:50051
NEXT_PUBLIC_REST_URL=http://localhost:8080/api
```

## Keyingi qadamlar

1. gRPC-Gateway qo'shish (agar REST kerak bo'lsa)
2. Frontend client library yaratish
3. Authentication token management
4. Error handling va retry logic



