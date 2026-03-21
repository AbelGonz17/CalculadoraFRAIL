<template>
  <div>
    <!-- Page Header -->
    <div
      class="page-header"
      style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px"
    >
      <div>
        <h1 class="page-header__title">
          {{ props.title }}
        </h1>
        <p class="page-header__subtitle">
          {{ props.subtitle }}
        </p>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <button
          v-if="props.actionButton"
          class="btn-ghost"
          @click="update"
        >
          <UIcon
            name="i-heroicons-arrow-path"
            style="width:14px;height:14px"
            :class="{ 'animate-spin': props.loading }"
          />
          Actualizar
        </button>
        <div style="font-size:12px;color:var(--text-muted);padding:0 8px">
          {{ currentDate }}
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const currentDate = computed(() =>
  new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
)

const props = defineProps<{
  title?: string
  subtitle: string
  actionButton?: boolean
  loading?: boolean
}>()

const emits = defineEmits(['change', 'update'])

const update = () => {
  emits('update')
}
</script>
