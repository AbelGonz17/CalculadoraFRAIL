import type { License, ApiResponse } from '~/types'
import { useApi } from '~/composables/useApi'

export const licensesService = {
  async create(license: Partial<License>): Promise<ApiResponse> {
    const api = useApi()
    return await api.post<ApiResponse>('/licenses', license)
  },
  async getAll(): Promise<License[]> {
    const api = useApi()
    const response = await api.get<ApiResponse<{ licenses: License[] }>>('/licenses')
    return response.licenses || []
  },
  async update(id: number, license: Partial<License>): Promise<ApiResponse> {
    const api = useApi()
    return await api.put<ApiResponse>(`/licenses/${id}`, license)
  },
  async delete(id: number): Promise<ApiResponse> {
    const api = useApi()
    return await api.delete<ApiResponse>(`/licenses/${id}`)
  }
}
