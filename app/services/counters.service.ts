import type { CounterData, ReceivedBatch, ApiResponse } from '~/types'
import { useApi } from '~/composables/useApi'

export const countersService = {
  async getAll(page: number = 1, limit: number = 10): Promise<CounterData> {
    const api = useApi()
    const response = await api.get<ApiResponse<CounterData>>(`/counter?page=${page}&limit=${limit}`)
    return {
      data: response.data || [],
      meta: response.meta || { page, limit, total: 0, totalPages: 0 }
    }
  },

  async processBatch(batch: Partial<ReceivedBatch>): Promise<ApiResponse> {
    const api = useApi()
    return await api.post<ApiResponse>('/counter', batch)
  }
}
