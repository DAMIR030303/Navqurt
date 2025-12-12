import fs from 'fs'
import path from 'path'

import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

// Proto fayllarni yuklash
const PROTO_PATH = path.join(process.cwd(), 'backend/api/proto')

// Check if proto files exist, if not, use fallback
const protoFiles = [
  'employee.proto',
  'auth.proto',
  'kpi.proto',
  'attendance.proto',
  'finance.proto',
].filter(file => {
  const filePath = path.join(PROTO_PATH, file)
  return fs.existsSync(filePath)
})

let packageDefinition: protoLoader.PackageDefinition

if (protoFiles.length > 0) {
  packageDefinition = protoLoader.loadSync(
    protoFiles.map(file => path.join(PROTO_PATH, file)),
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
      includeDirs: [PROTO_PATH],
    }
  )
} else {
  // Fallback: empty package definition
  packageDefinition = {}
}

const loadedPackage = grpc.loadPackageDefinition(packageDefinition) as any
const employeeProto = loadedPackage.employee
const authProto = loadedPackage.auth
// Note: kpiProto, attendanceProto, financeProto are reserved for future use
// const kpiProto = loadedPackage.kpi
// const attendanceProto = loadedPackage.attendance
// const financeProto = loadedPackage.finance

// gRPC server address
const GRPC_SERVER = process.env.NEXT_PUBLIC_GRPC_SERVER || 'localhost:50051'

// Helper function to create client with auth
function createClientWithAuth(Service: any, token?: string) {
  if (!Service) {
    throw new Error('Service is not available')
  }
  
  const credentials = grpc.credentials.createInsecure()
  const client = new Service(GRPC_SERVER, credentials)
  const metadata = new grpc.Metadata()
  
  if (token) {
    metadata.add('authorization', `Bearer ${token}`)
  }
  
  return { client, metadata }
}

// Employee Service Client
export const employeeClient = {
  listEmployees: (page: number = 1, pageSize: number = 10, token?: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!employeeProto || !employeeProto.EmployeeService) {
        reject(new Error('Employee service not available'))
        return
      }
      
      try {
        const { client, metadata } = createClientWithAuth(employeeProto.EmployeeService, token)
        
        client.ListEmployees(
          { page, page_size: pageSize },
          metadata,
          (err: grpc.ServiceError | null, response: any) => {
            if (err) {
              reject(err)
            } else {
              resolve(response)
            }
          }
        )
      } catch (error) {
        reject(error)
      }
    })
  },
  
  getEmployee: (id: number, token?: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!employeeProto || !employeeProto.EmployeeService) {
        reject(new Error('Employee service not available'))
        return
      }
      
      const credentials = grpc.credentials.createInsecure()
      const client = new employeeProto.EmployeeService(GRPC_SERVER, credentials)
      const metadata = new grpc.Metadata()
      
      if (token) {
        metadata.add('authorization', `Bearer ${token}`)
      }
      
      client.GetEmployee({ id }, metadata, (err: grpc.ServiceError | null, response: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })
    })
  },
  
  createEmployee: (employee: any, token?: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!employeeProto || !employeeProto.EmployeeService) {
        reject(new Error('Employee service not available'))
        return
      }
      
      const credentials = grpc.credentials.createInsecure()
      const client = new employeeProto.EmployeeService(GRPC_SERVER, credentials)
      const metadata = new grpc.Metadata()
      
      if (token) {
        metadata.add('authorization', `Bearer ${token}`)
      }
      
      client.CreateEmployee(employee, metadata, (err: grpc.ServiceError | null, response: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })
    })
  },
}

// Auth Service Client
export const authClient = {
  login: (email: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!authProto || !authProto.AuthService) {
        reject(new Error('Auth service not available'))
        return
      }
      
      const credentials = grpc.credentials.createInsecure()
      const client = new authProto.AuthService(GRPC_SERVER, credentials)
      
      client.Login(
        { email, password },
        new grpc.Metadata(),
        (err: grpc.ServiceError | null, response: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        }
      )
    })
  },
  
  register: (email: string, password: string, name: string, companyName: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!authProto || !authProto.AuthService) {
        reject(new Error('Auth service not available'))
        return
      }
      
      const credentials = grpc.credentials.createInsecure()
      const client = new authProto.AuthService(GRPC_SERVER, credentials)
      
      client.Register(
        { email, password, name, company_name: companyName },
        new grpc.Metadata(),
        (err: grpc.ServiceError | null, response: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        }
      )
    })
  },
}

