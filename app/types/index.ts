export type ClientType = 'LABORATORY' | 'REFERENCE_LAB'
export type DeviceStatus = 'ACTIVE' | 'PENDING' | 'DISABLED' | 'REVOKED'

export interface Client {
  id: number
  clientId: string
  clientName: string
  clientType: ClientType
  status: boolean
  maxDevices: number
  allowedDomains?: string | null
  allowedIps?: string | null
  createdAt: string
  updatedAt: string
  _count?: {
    devices: number
  }
}

export interface License {
  id: number
  clientId: number
  expirationDate: string
  maxDevices: number
  createdAt: string
  updatedAt: string
  client: {
    clientName: string
  }
}

export interface Device {
  id: number
  clientId: number
  deviceId: string
  fingerprint: string
  publicKeyHash: string
  status: DeviceStatus
  lastIp?: string | null
  lastDomain?: string | null
  lastLogin?: string | null
  version: string
  createdAt: string
  updatedAt: string
  client: Client
}

interface DeviceOptional {
  id: number
  deviceId: string
  lastIp: string
}

export interface PrinterDevice {
  id: number
  serial: string
  model: string
  status: DeviceStatus
  counter: number
  deviceId?: number | null
  createdAt: string
  device: DeviceOptional | null
}

interface BatchOptional {
  serial: string
}
export interface ReceivedBatch {
  id: number
  batchId: string
  printerId?: number | null
  total: number
  location: string
  date: string
  printer: BatchOptional | null
}

export interface CounterData {
  data: ReceivedBatch[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiResponse<T = any> {
  ok: boolean
  message?: string
  data?: T
  [key: string]: any
}

// ─── Tipos de payload de logs (discriminated union) ─────────────────────────

/** Operación de base de datos (Prisma middleware) */
export interface DbOperationData {
  args: Record<string, any>
  duration: number
  operation: string // 'upsert' | 'update' | 'create' | 'delete' | etc.
}

/** Petición HTTP registrada */
export interface HttpRequestData {
  path: string
  method: string
  duration: number
  statusCode: number
}

export type AuditLogData = DbOperationData | HttpRequestData

export type AuditLogAction = 'CREATE' | 'UPDATE' | 'DELETE'

export interface AuditLog {
  id: string
  model: string
  action: AuditLogAction
  recordId: string | null
  data: AuditLogData
  userId: string | null
  ip: string | null
  userAgent: string | null
  createdAt: string
}

/** Respuesta paginada del endpoint GET /logs */
export interface LogsData {
  data: AuditLog[]
  meta: {
    total: number
    page: number
    lastPage: number
  }
}

export interface AuthorizedLog {
  id?: number
  ipPublic: string
  ipPrivate: string
  hostName: string
  message: string
  loggedAt: string

}

export interface AuthorizedLogData {
  ok: boolean
  data: AuthorizedLog[]
  meta: {
    total: number
    page: number
    lastPage: number
  }
}
