import type { ReceivedBatch, ApiResponse, LogsData, AuthorizedLogData } from '~/types'
import { useApi } from '~/composables/useApi'

export const LogsService = {
  async getAll(page: number = 1, limit: number = 10): Promise<LogsData> {
    const api = useApi()
    const response = await api.get<ApiResponse<LogsData['data']>>(`/logs?page=${page}&limit=${limit}`)
    return {
      data: response.data ?? [],
      meta: {
        total: response.meta?.total ?? 0,
        page: response.meta?.page ?? page,
        lastPage: response.meta?.lastPage ?? 1
      }
    }
  },

  async notAuthorizedLog(page: number = 1, limit: number = 10): Promise<AuthorizedLogData> {
    const api = useApi()
    const response = await api.get<ApiResponse<AuthorizedLogData['data']>>(`/logs/notAuthorized?page=${page}&limit=${limit}`)
    return {
      data: response.data ?? [],
      meta: {
        total: response.meta?.total ?? 0,
        page: response.meta?.page ?? page,
        lastPage: response.meta?.lastPage ?? 1
      }
    }
  },

  async processBatch(batch: Partial<ReceivedBatch>): Promise<ApiResponse> {
    const api = useApi()
    return await api.post<ApiResponse>('/counter', batch)
  }
}
