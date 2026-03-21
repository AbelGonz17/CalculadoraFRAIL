import type { PrinterDevice, ApiResponse } from '~/types'
import { useApi } from '~/composables/useApi'

export const printersService = {
  async getAll(serial?: string): Promise<PrinterDevice[]> {
    const api = useApi()
    const query = serial ? `?serial=${serial}` : ''
    const response = await api.get<ApiResponse<PrinterDevice[]>>(`/printerDevices${query}`)
    return response.data || []
  },

  async create(printer: Partial<PrinterDevice>): Promise<ApiResponse> {
    const api = useApi()
    return await api.post<ApiResponse>('/printerDevices', printer)
  },

  async update(id: string | number, printer: Partial<PrinterDevice>): Promise<ApiResponse> {
    const api = useApi()
    return await api.put<ApiResponse>(`/printerDevices/${id}`, printer)
  },

  async delete(id: string | number): Promise<ApiResponse> {
    const api = useApi()
    return await api.delete<ApiResponse>(`/printerDevices/${id}`)
  }
}
