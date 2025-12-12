import fs from 'fs'
import path from 'path'

import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { NextRequest, NextResponse } from 'next/server'

// Load proto files
const PROTO_PATH = path.join(process.cwd(), 'backend/api/proto')
const taskProtoPath = path.join(PROTO_PATH, 'task.proto')

let taskService: any = null

// Initialize gRPC client
function initTaskClient() {
  if (taskService) return taskService
  
  if (!fs.existsSync(taskProtoPath)) {
    return null
  }
  
  try {
    const packageDefinition = protoLoader.loadSync(taskProtoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: [PROTO_PATH],
    })
    
    const loadedPackage = grpc.loadPackageDefinition(packageDefinition) as any
    taskService = loadedPackage.task?.TaskService
    return taskService
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const positionId = parseInt(searchParams.get('position_id') || '0')
    const frequency = searchParams.get('frequency') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('page_size') || '10')
    
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    const TaskService = initTaskClient()
    
    if (!TaskService) {
      return NextResponse.json({
        tasks: [],
        total: 0,
        page,
        pageSize,
      })
    }
    
    const GRPC_SERVER = process.env.NEXT_PUBLIC_GRPC_SERVER || 'localhost:50051'
    const credentials = grpc.credentials.createInsecure()
    const client = new TaskService(GRPC_SERVER, credentials)
    const metadata = new grpc.Metadata()
    
    if (token) {
      metadata.add('authorization', `Bearer ${token}`)
    }
    
    const response = await Promise.race([
      new Promise<any>((resolve, reject) => {
        client.ListTasks(
          { position_id: positionId, frequency, page, page_size: pageSize },
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
    
    const tasks = response.tasks || []
    const formattedTasks = tasks.map((task: any) => ({
      id: parseInt(task.id) || task.id,
      position_id: parseInt(task.positionId) || task.position_id || 0,
      name: task.name || '',
      description: task.description || '',
      frequency: task.frequency || 'daily',
      priority: task.priority || 'medium',
      kpi_weight: task.kpiWeight || task.kpi_weight || 0,
      created_at: task.createdAt || task.created_at || new Date().toISOString(),
      updated_at: task.updatedAt || task.updated_at || new Date().toISOString(),
    }))
    
    return NextResponse.json({
      tasks: formattedTasks,
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
        tasks: [],
        total: 0,
        page: 1,
        pageSize: 10,
        error: 'gRPC server is not available.',
      })
    }
    
    return NextResponse.json(
      { 
        error: errorMessage || 'Failed to fetch tasks',
        tasks: [],
        total: 0,
      },
      { status: 200 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { position_id, name, description, frequency, priority, kpi_weight } = body
    
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    const TaskService = initTaskClient()
    
    if (!TaskService) {
      return NextResponse.json(
        { error: 'gRPC service not available' },
        { status: 503 }
      )
    }
    
    const GRPC_SERVER = process.env.NEXT_PUBLIC_GRPC_SERVER || 'localhost:50051'
    const credentials = grpc.credentials.createInsecure()
    const client = new TaskService(GRPC_SERVER, credentials)
    const metadata = new grpc.Metadata()
    
    if (token) {
      metadata.add('authorization', `Bearer ${token}`)
    }
    
    const response = await Promise.race([
      new Promise<any>((resolve, reject) => {
        client.CreateTask(
          { 
            position_id,
            name,
            description,
            frequency: frequency || 'daily',
            priority: priority || 'medium',
            kpi_weight: kpi_weight || 0,
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
    
    const task = {
      id: parseInt(response.id) || response.id,
      position_id: parseInt(response.positionId) || response.position_id || position_id,
      name: response.name || '',
      description: response.description || '',
      frequency: response.frequency || 'daily',
      priority: response.priority || 'medium',
      kpi_weight: response.kpiWeight || response.kpi_weight || 0,
      created_at: response.createdAt || response.created_at || new Date().toISOString(),
      updated_at: response.updatedAt || response.updated_at || new Date().toISOString(),
    }
    
    return NextResponse.json(task, { status: 201 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: errorMessage || 'Failed to create task' },
      { status: 500 }
    )
  }
}

