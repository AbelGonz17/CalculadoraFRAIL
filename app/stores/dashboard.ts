import { defineStore } from 'pinia'
import type { AuditLog, AuthorizedLogData, Client, Device, PrinterDevice } from '~/types'
import { clientsService } from '~/services/clients.service'
import { devicesService } from '~/services/devices.service'
import { printersService } from '~/services/printers.service'
import { LogsService } from '~/services/logs.service'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    clients: [] as Client[],
    devices: [] as Device[],
    printers: [] as PrinterDevice[],
    logs: [] as AuditLog[],
    logsMeta: { total: 0, page: 1, lastPage: 1 } as { total: number, page: number, lastPage: number },
    noAuthorizedLogs: {} as AuthorizedLogData,
    logsLoading: false,
    clientSelect: [],
    loading: false,
    error: null as string | null
  }),

  getters: {
    totalClients: state => state.clients.length,
    activeClients: state => state.clients.filter(c => c.status).length,
    totalDevices: state => state.devices.length,
    activeDevices: state => state.devices.filter(d => d.status === 'ACTIVE').length,
    pendingDevices: state => state.devices.filter(d => d.status === 'PENDING').length,
    totalPrinters: state => state.printers.length,
    activePrinters: state => state.printers.filter(p => p.status === 'ACTIVE').length,

    stats: state => ({
      clients: {
        total: state.clients.length,
        active: state.clients.filter(c => c.status).length,
        inactive: state.clients.filter(c => !c.status).length
      },
      devices: {
        total: state.devices.length,
        active: state.devices.filter(d => d.status === 'ACTIVE').length,
        pending: state.devices.filter(d => d.status === 'PENDING').length,
        disabled: state.devices.filter(d => d.status === 'DISABLED').length,
        revoked: state.devices.filter(d => d.status === 'REVOKED').length
      },
      printers: {
        total: state.printers.length,
        active: state.printers.filter(p => p.status === 'ACTIVE').length,
        totalCounter: state.printers.reduce((sum, p) => sum + p.counter, 0)
      }
    })
  },

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        await Promise.all([
          this.fetchClients(),
          this.fetchDevices(),
          this.fetchPrinters()
        ])
      } catch (error: any) {
        this.error = error.message || 'Error al cargar los datos'
        console.error('Error fetching dashboard data:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchClients() {
      try {
        this.clients = await clientsService.getAll()
        this.clientSelect = this.clients.map(client => ({
          value: client.id,
          label: client.clientName
        }))
      } catch (error: any) {
        throw new Error(`Error al cargar clientes: ${error.message}`)
      }
    },

    async fetchDevices() {
      try {
        this.devices = await devicesService.getAll()
      } catch (error: any) {
        throw new Error(`Error al cargar dispositivos: ${error.message}`)
      }
    },

    async fetchPrinters() {
      try {
        this.printers = await printersService.getAll()
      } catch (error: any) {
        throw new Error(`Error al cargar impresoras: ${error.message}`)
      }
    },

    async getLogs(page: number = 1, limit: number = 10) {
      try {
        this.logsLoading = true
        const response = await LogsService.getAll(page, limit)
        this.logs = response.data
        this.logsMeta = response.meta
      } catch (error: any) {
        throw new Error(`Error al cargar logs: ${error.message}`)
      } finally {
        this.logsLoading = false
      }
    },
    async notAuthorizedLog(page: number = 1, limit: number = 20) {
      try {
        this.logsLoading = true
        const response = await LogsService.notAuthorizedLog(page, limit)
        this.noAuthorizedLogs = response
      } catch (error: any) {
        throw new Error(`Error al cargar logs: ${error.message}`)
      } finally {
        this.logsLoading = false
      }
    }
  }
})
