import fs from 'fs'
import path from 'path'

import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { NextRequest, NextResponse } from 'next/server'

// Load proto files
const PROTO_PATH = path.join(process.cwd(), 'backend/api/proto')
const employeeProtoPath = path.join(PROTO_PATH, 'employee.proto')

let employeeService: any = null

// Initialize gRPC client
function initEmployeeClient() {
  if (employeeService) return employeeService
  
  if (!fs.existsSync(employeeProtoPath)) {
    // Employee proto file not found, using fallback
    return null
  }
  
  try {
    const packageDefinition = protoLoader.loadSync(employeeProtoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: [PROTO_PATH],
    })
    
    const loadedPackage = grpc.loadPackageDefinition(packageDefinition) as any
    employeeService = loadedPackage.employee?.EmployeeService
    return employeeService
  } catch {
    // Failed to load employee proto - error logged silently
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('page_size') || '10')
    
    // Get token from header
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    // Initialize client
    const EmployeeService = initEmployeeClient()
    
    if (!EmployeeService) {
      // Fallback: return empty list if proto not available
      return NextResponse.json({
        employees: [],
        total: 0,
        page,
        pageSize,
      })
    }
    
    // Create gRPC client
    const GRPC_SERVER = process.env.NEXT_PUBLIC_GRPC_SERVER || 'localhost:50051'
    const credentials = grpc.credentials.createInsecure()
    const client = new EmployeeService(GRPC_SERVER, credentials)
    const metadata = new grpc.Metadata()
    
    if (token) {
      metadata.add('authorization', `Bearer ${token}`)
    }
    
    // Call gRPC service with timeout
    const response = await Promise.race([
      new Promise<any>((resolve, reject) => {
        client.ListEmployees(
          { page, page_size: pageSize },
          metadata,
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
    
    // Transform gRPC response to JSON
    const employees = response.employees || []
    const formattedEmployees = employees.map((emp: any) => ({
      id: parseInt(emp.id) || emp.id,
      first_name: emp.firstName || emp.first_name || '',
      last_name: emp.lastName || emp.last_name || '',
      email: emp.email || '',
      phone: emp.phone || '',
      position: emp.position || '',
      department: emp.department || '',
      status: emp.status || 'active',
      avatar_url: emp.avatarUrl || emp.avatar_url || '',
      performance: emp.performance || 0,
      is_top_performer: emp.isTopPerformer || emp.is_top_performer || false,
      location: emp.location || '',
      join_date: emp.joinDate || emp.join_date || '',
      created_at: emp.createdAt || emp.created_at || new Date().toISOString(),
    }))
    
    return NextResponse.json({
      employees: formattedEmployees,
      total: response.total || 0,
      page: response.page || page,
      pageSize: response.pageSize || response.page_size || pageSize,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorCode = (error as { code?: number })?.code
    
    // Log error for debugging
    console.error('[API /employees] Error:', errorMessage, errorCode)
    
    // If gRPC server is not available, return empty list (frontend will use static data)
    // Don't return 500 error, return 200 with empty list
    if (errorMessage.includes('ECONNREFUSED') || 
        errorMessage.includes('timeout') || 
        errorMessage.includes('14 UNAVAILABLE')) {
      return NextResponse.json({
        employees: [],
        total: 0,
        page: 1,
        pageSize: 10,
        error: 'gRPC server is not available. Using fallback data.',
      })
    }
    
    // Return empty list on error (fallback to static data in frontend)
    return NextResponse.json(
      { 
        error: errorMessage || 'Failed to fetch employees',
        employees: [],
        total: 0,
      },
      { status: errorCode === grpc.status.UNAUTHENTICATED ? 401 : 200 }
    )
  }
}

