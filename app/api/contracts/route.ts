import fs from 'fs'
import path from 'path'

import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { NextRequest, NextResponse } from 'next/server'

// Load proto files
const PROTO_PATH = path.join(process.cwd(), 'backend/api/proto')
const contractProtoPath = path.join(PROTO_PATH, 'contract.proto')

let contractService: any = null

// Initialize gRPC client
function initContractClient() {
  if (contractService) return contractService
  
  if (!fs.existsSync(contractProtoPath)) {
    return null
  }
  
  try {
    const packageDefinition = protoLoader.loadSync(contractProtoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: [PROTO_PATH],
    })
    
    const loadedPackage = grpc.loadPackageDefinition(packageDefinition) as any
    contractService = loadedPackage.contract?.ContractService
    return contractService
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const employeeId = parseInt(searchParams.get('employee_id') || '0')
    const positionId = parseInt(searchParams.get('position_id') || '0')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('page_size') || '10')
    
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    const ContractService = initContractClient()
    
    if (!ContractService) {
      return NextResponse.json({
        contracts: [],
        total: 0,
        page,
        pageSize,
      })
    }
    
    const GRPC_SERVER = process.env.NEXT_PUBLIC_GRPC_SERVER || 'localhost:50051'
    const credentials = grpc.credentials.createInsecure()
    const client = new ContractService(GRPC_SERVER, credentials)
    const metadata = new grpc.Metadata()
    
    if (token) {
      metadata.add('authorization', `Bearer ${token}`)
    }
    
    const response = await Promise.race([
      new Promise<any>((resolve, reject) => {
        client.ListContracts(
          { employee_id: employeeId, position_id: positionId, page, page_size: pageSize },
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
    
    const contracts = response.contracts || []
    const formattedContracts = contracts.map((contract: any) => ({
      id: parseInt(contract.id) || contract.id,
      employee_id: parseInt(contract.employeeId) || contract.employee_id || 0,
      position_id: parseInt(contract.positionId) || contract.position_id || 0,
      contract_type: contract.contractType || contract.contract_type || 'full_time',
      start_date: contract.startDate || contract.start_date || '',
      end_date: contract.endDate || contract.end_date || null,
      probation_period_days: contract.probationPeriodDays || contract.probation_period_days || 0,
      terms_json: contract.termsJson || contract.terms_json || '{}',
      created_at: contract.createdAt || contract.created_at || new Date().toISOString(),
      updated_at: contract.updatedAt || contract.updated_at || new Date().toISOString(),
    }))
    
    return NextResponse.json({
      contracts: formattedContracts,
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
        contracts: [],
        total: 0,
        page: 1,
        pageSize: 10,
        error: 'gRPC server is not available.',
      })
    }
    
    return NextResponse.json(
      { 
        error: errorMessage || 'Failed to fetch contracts',
        contracts: [],
        total: 0,
      },
      { status: 200 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { employee_id, position_id, contract_type, start_date, end_date, probation_period_days, terms_json } = body
    
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    const ContractService = initContractClient()
    
    if (!ContractService) {
      return NextResponse.json(
        { error: 'gRPC service not available' },
        { status: 503 }
      )
    }
    
    const GRPC_SERVER = process.env.NEXT_PUBLIC_GRPC_SERVER || 'localhost:50051'
    const credentials = grpc.credentials.createInsecure()
    const client = new ContractService(GRPC_SERVER, credentials)
    const metadata = new grpc.Metadata()
    
    if (token) {
      metadata.add('authorization', `Bearer ${token}`)
    }
    
    const response = await Promise.race([
      new Promise<any>((resolve, reject) => {
        client.CreateContract(
          { 
            employee_id,
            position_id,
            contract_type: contract_type || 'full_time',
            start_date,
            end_date: end_date || '',
            probation_period_days: probation_period_days || 0,
            terms_json: terms_json || '{}',
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
    
    const contract = {
      id: parseInt(response.id) || response.id,
      employee_id: parseInt(response.employeeId) || response.employee_id || employee_id,
      position_id: parseInt(response.positionId) || response.position_id || position_id,
      contract_type: response.contractType || response.contract_type || 'full_time',
      start_date: response.startDate || response.start_date || '',
      end_date: response.endDate || response.end_date || null,
      probation_period_days: response.probationPeriodDays || response.probation_period_days || 0,
      terms_json: response.termsJson || response.terms_json || '{}',
      created_at: response.createdAt || response.created_at || new Date().toISOString(),
      updated_at: response.updatedAt || response.updated_at || new Date().toISOString(),
    }
    
    return NextResponse.json(contract, { status: 201 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: errorMessage || 'Failed to create contract' },
      { status: 500 }
    )
  }
}

