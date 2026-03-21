import type { Device, ApiResponse, DeviceStatus } from '~/types'
import { useApi } from '~/composables/useApi'

export const devicesService = {
  async getAll(): Promise<Device[]> {
    const api = useApi()
    const response = await api.get<ApiResponse<{ clients: Device[] }>>('/pc-client')
    return response.clients || []
  },

  async getByHostName(hostName: string): Promise<Device> {
    const api = useApi()
    const response = await api.get<Device>(`/pc-client/${hostName}`)
    return response
  },

  async create(device: Partial<Device>): Promise<ApiResponse> {
    const api = useApi()
    return await api.post<ApiResponse>('/pc-client', device)
  },

  async update(id: number, device: Partial<Device>): Promise<ApiResponse> {
    const api = useApi()
    return await api.put<ApiResponse>(`/pc-client/${id}`, device)
  },

  async changeStatus(id: number, status: DeviceStatus): Promise<ApiResponse> {
    const api = useApi()
    return await api.put<ApiResponse>(`/pc-client/status/${id}`, { status })
  },

  async authorize(device: Partial<Device>): Promise<ApiResponse> {
    const api = useApi()
    return await api.post<ApiResponse>('/pc-authorized', device)
  },
}
