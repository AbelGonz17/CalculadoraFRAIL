<script lang="ts" setup>
import { company } from '../data/dataTest'
/**
 * *1. Props y Emit
 */

/**
 * *2. Stores y Composables
 */
const getStatusClass = (isActive: boolean): string => {
  if (isActive) return 'success'
  return 'danger' // o 'muted', según tu caso
}
const statusMenuItems = () => [
  [
    { label: 'Cambiar a Activo', icon: 'i-heroicons-check-circle' },
    { label: 'Cambiar a Pendiente', icon: 'i-heroicons-clock' },
    { label: 'Deshabilitar', icon: 'i-heroicons-no-symbol' }
  ],
  [
    { label: 'Eliminar Impresora', icon: 'i-heroicons-trash', color: 'danger' }
  ]
]
/**
 * *3. Refs y Reactive State
 */

/**
 * *4. Computed
 */

/**
 * *5. Watchers
 */

/**
 * *6. Métodos
 */

/**
 * *7. Ciclo de vida
 */
</script>

<template>
  <PageLayout
    title="Compañias"
    :action-button="true"
  >
    <div class="flex flex-col gap-3 w-full">
      <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;flex-direction: column;">
        <div style="flex:1;min-width:200px;position:relative">
          <UIcon
            name="i-heroicons-magnifying-glass"
            style="position:absolute;left:12px;top:50%;transform:translateY(-50%);width:14px;height:14px;color:var(--text-muted);z-index:1;pointer-events:none"
          />
          <input

            placeholder="Buscar por número de serie..."
            style="width:100%;background:var(--surface-1);border:1px solid var(--border);border-radius:10px;padding:9px 12px 9px 36px;font-size:13px;color:var(--text-primary);outline:none;transition:border-color 0.18s;font-family:inherit"
            @input="handleSearch"
            @focus="(e: Event) => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'"
            @blur="(e: Event) => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'"
          >
        </div>
        <div class="data-card">
          <div class="data-card__header">
            <span class="data-card__title">Compañías Registradas</span>
            <!-- <span class="badge muted">{{ filteredDevices.length }} de {{ devices.length }}</span> -->
          </div>

          <div
            v-if="loading"
            style="
          padding: 48px;
          text-align: center;
          color: var(--text-muted);
          font-size: 13px;
        "
          >
            <UIcon
              name="i-heroicons-arrow-path"
              class="animate-spin"
              style="
            width: 20px;
            height: 20px;
            margin-bottom: 8px;
            display: block;
            margin-inline: auto;
          "
            />
            Cargando...
          </div>

          <div
            v-else
            style="overflow-x: auto"
          >
            <!-- <div style="display:flex;gap:6px">
            <button
              v-for="opt in statusOptions"
              :key="opt.value"
              class="btn-ghost"
              :style="filters.status === opt.value ? 'background:var(--accent-soft);border-color:var(--accent);color:var(--text-primary)' : ''"
              style="font-size:12px;padding:7px 14px"
              @click="filters.status = (filters.status === opt.value ? null : opt.value as DeviceStatus)"
            >
              {{ opt.label }}
            </button>
          </div> -->
          </div>
          <table class="premium-table">
            <thead>
              <tr>
                <th>Compañía</th>
                <th>Tipo</th>
                <th>RNC</th>
                <th>Estado</th>
                <th style="text-align: right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-if="filteredDevices.length === 0">
              <td
                colspan="7"
                style="
                  text-align: center;
                  padding: 40px;
                  color: var(--text-muted);
                "
              >
                Sin dispositivos
              </td>
            </tr> -->
              <tr
                v-for="item in company"
                :key="item.id"
              >
                <td>
                  <span>{{ item.description }}</span>
                </td>
                <td>
                  {{ item.referetor }}
                </td>
                <td>
                  {{ item?.companyRNC ?? '-' }}
                </td>
                <span
                  class="badge flex items-center"
                  :class="getStatusClass(item.statusId)"
                >
                  <span
                    style="
                      width: 5px;
                      height: 5px;
                      border-radius: 50%;
                      display: inline-block;
                      margin-right: 4px;
                      background: currentColor;
                    "
                  />
                  {{ item.statusId ? 'Activo' :'Desactivado' }}
                </span>
                <!-- <td>
                <span
                  class="badge"
                  :class="getStatusClass(item.statusId)"
                >
                  <span
                    style="
                      width: 5px;
                      height: 5px;
                      border-radius: 50%;
                      display: inline-block;
                      margin-right: 4px;
                      background: currentColor;
                    "
                  />
                  {{ item.statusId }}
                </span>
              </td> -->

                <!-- <td style="color: var(--text-secondary)">
                {{ device.version }}
              </td>
              <td style="font-size: 12px; color: var(--text-muted)">
                {{ device.lastIp || "—" }}
              </td>
              <td style="font-size: 12px; color: var(--text-muted)">
                {{ formatDate(device.lastLogin) }}
              </td>
              <td style="font-size: 12px; color: var(--text-muted)">
                {{ device.client.clientName }}
              </td>
              <td>
                <div style="display: flex; justify-content: flex-end; gap: 6px">
                  <button
                    class="btn-ghost"
                    style="padding: 5px 10px; font-size: 12px"
                    @click="openEdit(device)"
                  >
                    <UIcon
                      name="i-heroicons-pencil"
                      style="width: 12px; height: 12px"
                    />
                  </button>
                  <UDropdownMenu :items="statusMenuItems(device)">
                    <button
                      class="btn-ghost"
                      style="padding: 5px 10px; font-size: 12px"
                    >
                      <UIcon
                        name="i-heroicons-ellipsis-vertical"
                        style="width: 12px; height: 12px"
                      />
                    </button>
                  </UDropdownMenu>
                </div>
              </td> -->
                <td>
                  <div style="display: flex; justify-content: flex-end; gap: 6px">
                    <button
                      class="btn-ghost"
                      style="padding: 5px 10px; font-size: 12px"
                      @click="openEdit(device)"
                    >
                      <UIcon
                        name="i-heroicons-pencil"
                        style="width: 12px; height: 12px"
                      />
                    </button>
                    <UDropdownMenu :items="statusMenuItems(device)">
                      <button
                        class="btn-ghost"
                        style="padding: 5px 10px; font-size: 12px"
                      >
                        <UIcon
                          name="i-heroicons-ellipsis-vertical"
                          style="width: 12px; height: 12px"
                        />
                      </button>
                    </UDropdownMenu>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<style scoped>
/* estilos aquí */
</style>
