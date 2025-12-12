import fs from 'fs'
import path from 'path'

import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { NextRequest, NextResponse } from 'next/server'

// Load proto files
const PROTO_PATH = path.join(process.cwd(), 'backend/api/proto')
const positionProtoPath = path.join(PROTO_PATH, 'position.proto')

let positionService: any = null

// Initialize gRPC client
function initPositionClient() {
  if (positionService) return positionService
  
  if (!fs.existsSync(positionProtoPath)) {
    return null
  }
  
  try {
    const packageDefinition = protoLoader.loadSync(positionProtoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: [PROTO_PATH],
    })
    
    const loadedPackage = grpc.loadPackageDefinition(packageDefinition) as any
    positionService = loadedPackage.position?.PositionService
    return positionService
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const companyId = parseInt(searchParams.get('company_id') || '1')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('page_size') || '10')
    const search = searchParams.get('search') || ''
    const department = searchParams.get('department') || ''
    
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    const PositionService = initPositionClient()
    
    if (!PositionService) {
      return NextResponse.json({
        positions: [],
        total: 0,
        page,
        pageSize,
      })
    }
    
    const GRPC_SERVER = process.env.NEXT_PUBLIC_GRPC_SERVER || 'localhost:50051'
    const credentials = grpc.credentials.createInsecure()
    const client = new PositionService(GRPC_SERVER, credentials)
    const metadata = new grpc.Metadata()
    
    if (token) {
      metadata.add('authorization', `Bearer ${token}`)
    }
    
    const response = await Promise.race([
      new Promise<any>((resolve, reject) => {
        client.ListPositions(
          { company_id: companyId, page, page_size: pageSize, search, department },
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
    
    const positions = response.positions || []
    const formattedPositions = positions.map((pos: any) => ({
      id: parseInt(pos.id) || pos.id,
      company_id: parseInt(pos.companyId) || pos.company_id || companyId,
      name: pos.name || '',
      description: pos.description || '',
      department: pos.department || '',
      max_employees: pos.maxEmployees || pos.max_employees || 1,
      created_at: pos.createdAt || pos.created_at || new Date().toISOString(),
      updated_at: pos.updatedAt || pos.updated_at || new Date().toISOString(),
    }))
    
    return NextResponse.json({
      positions: formattedPositions,
      total: response.total || 0,
      page: response.page || page,
      pageSize: response.pageSize || response.page_size || pageSize,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    if (errorMessage.includes('ECONNREFUSED') || 
        errorMessage.includes('timeout') || 
        errorMessage.includes('14 UNAVAILABLE')) {
      return NextResponse.json({
        positions: [],
        total: 0,
        page: 1,
        pageSize: 10,
        error: 'gRPC server is not available.',
      })
    }
    
    return NextResponse.json(
      { 
        error: errorMessage || 'Failed to fetch positions',
        positions: [],
        total: 0,
      },
      { status: 200 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company_id, name, description, department, max_employees } = body
    
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    const PositionService = initPositionClient()
    
    if (!PositionService) {
      return NextResponse.json(
        { error: 'gRPC service not available' },
        { status: 503 }
      )
    }
    
    const GRPC_SERVER = process.env.NEXT_PUBLIC_GRPC_SERVER || 'localhost:50051'
    const credentials = grpc.credentials.createInsecure()
    const client = new PositionService(GRPC_SERVER, credentials)
    const metadata = new grpc.Metadata()
    
    if (token) {
      metadata.add('authorization', `Bearer ${token}`)
    }
    
    const response = await Promise.race([
      new Promise<any>((resolve, reject) => {
        client.CreatePosition(
          { 
            company_id: company_id || 1,
            name,
            description,
            department,
            max_employees: max_employees || 1,
          },
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
    
    const position = {
      id: parseInt(response.id) || response.id,
      company_id: parseInt(response.companyId) || response.company_id || company_id,
      name: response.name || '',
      description: response.description || '',
      department: response.department || '',
      max_employees: response.maxEmployees || response.max_employees || 1,
      created_at: response.createdAt || response.created_at || new Date().toISOString(),
      updated_at: response.updatedAt || response.updated_at || new Date().toISOString(),
    }
    
    return NextResponse.json(position, { status: 201 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: errorMessage || 'Failed to create position' },
      { status: 500 }
    )
  }
}

