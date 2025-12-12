import fs from 'fs'
import path from 'path'

import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { NextRequest, NextResponse } from 'next/server'

// Load proto files
const PROTO_PATH = path.join(process.cwd(), 'backend/api/proto')
const authProtoPath = path.join(PROTO_PATH, 'auth.proto')

let authService: any = null

// Initialize gRPC client
function initAuthClient() {
  if (authService) return authService
  
  if (!fs.existsSync(authProtoPath)) {
    return null
  }
  
  try {
    const packageDefinition = protoLoader.loadSync(authProtoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: [PROTO_PATH],
    })
    
    const loadedPackage = grpc.loadPackageDefinition(packageDefinition) as any
    authService = loadedPackage.auth?.AuthService
    return authService
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  let body: any = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Noto\'g\'ri so\'rov formati' },
      { status: 400 }
    )
  }

  try {
    const { email, password } = body
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email va parol talab qilinadi' },
        { status: 400 }
      )
    }
    
    const AuthService = initAuthClient()
    
    if (!AuthService) {
      // Fallback: demo login
      // For Navoiyda Bugun email, return company_id = 1
      const isNavoiydaBugun = email === 'navoiyda@bugun.uz'
      return NextResponse.json({
        token: 'demo-token',
        user: {
          id: 1,
          email: email,
          name: isNavoiydaBugun ? 'Navoiyda Bugun Admin' : 'Demo User',
          role: 'admin',
          company_id: isNavoiydaBugun ? 1 : 0,
        },
        message: 'Demo rejim - gRPC server mavjud emas',
      })
    }
    
    const GRPC_SERVER = process.env.NEXT_PUBLIC_GRPC_SERVER || 'localhost:50051'
    const credentials = grpc.credentials.createInsecure()
    const client = new AuthService(GRPC_SERVER, credentials)
    
    const response = await Promise.race([
      new Promise<any>((resolve, reject) => {
        client.Login(
          { email, password },
          {},
          (err: grpc.ServiceError | null, res: any) => {
            if (err) {
              reject(err)
            } else {
              resolve(res)
            }
          }
        )
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('gRPC call timeout')), 5000)
      })
    ])
    
    const user = {
      id: parseInt(response.user?.id) || response.user?.id || 1,
      email: response.user?.email || email,
      name: response.user?.name || 'Navoiyda Bugun',
      role: response.user?.role || 'admin',
      company_id: parseInt(response.user?.companyId) || response.user?.company_id || 1,
    }
    
    return NextResponse.json({
      token: response.token || 'demo-token',
      refresh_token: response.refreshToken || response.refresh_token,
      user,
      expires_at: response.expiresAt || response.expires_at,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorCode = (error as { code?: number })?.code
    
    // gRPC error codes
    if (errorCode === grpc.status.UNAUTHENTICATED || errorCode === grpc.status.INVALID_ARGUMENT) {
      return NextResponse.json(
        { error: 'Noto\'g\'ri email yoki parol' },
        { status: 401 }
      )
    }
    
    if (errorMessage.includes('ECONNREFUSED') || 
        errorMessage.includes('timeout') || 
        errorMessage.includes('14 UNAVAILABLE')) {
      // Fallback to demo login if server is not available
      // For Navoiyda Bugun email, return company_id = 1
      const isNavoiydaBugun = body.email === 'navoiyda@bugun.uz'
      return NextResponse.json({
        token: 'demo-token',
        user: {
          id: 1,
          email: body.email || 'navoiyda@bugun.uz',
          name: isNavoiydaBugun ? 'Navoiyda Bugun Admin' : 'Demo User',
          role: 'admin',
          company_id: isNavoiydaBugun ? 1 : 0,
        },
        message: 'Demo rejim - gRPC server mavjud emas',
      })
    }
    
    return NextResponse.json(
      { error: errorMessage || 'Login xatosi' },
      { status: 500 }
    )
  }
}

