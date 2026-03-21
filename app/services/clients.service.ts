import type { Client, ApiResponse } from '~/types'
import { useApi } from '~/composables/useApi'

export const clientsService = {
  async getAll(): Promise<Client[]> {
    const api = useApi()
    const response = await api.get<ApiResponse<{ clientsAuthorized: Client[] }>>('/ClientAuthorized')
    return response.clientsAuthorized || []
  },

  async getByIp(ip: string): Promise<Client> {
    const api = useApi()
    const response = await api.get<Client>(`/ClientAuthorized/${ip}`)
    return response
  },

  async getByDomain(domain: string): Promise<Client> {
    const api = useApi()
    const response = await api.get<Client>(`/domain/${domain}`)
    return response
  },

  async create(client: Partial<Client>): Promise<ApiResponse> {
    const api = useApi()
    return await api.post<ApiResponse>('/ClientAuthorized', client)
  },

  async update(id: number, client: Partial<Client>): Promise<ApiResponse> {
    const api = useApi()
    return await api.put<ApiResponse>(`/ClientAuthorized/${id}`, client)
  }
}
