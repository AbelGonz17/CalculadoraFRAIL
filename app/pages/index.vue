<script setup lang="ts">
import { projectConfig } from '~/project.config'

definePageMeta({
})

useSeoMeta({
  title: projectConfig.name,
  description: projectConfig.description
})
</script>

<template>
  <div class="p-4 space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon
            name="i-heroicons-sparkles"
            class="w-6 h-6 text-primary-500"
          />
          <h1 class="text-xl font-bold">
            {{ projectConfig.name }}
          </h1>
        </div>
      </template>

      <div class="space-y-4">
        <p class="text-muted">
          {{ projectConfig.description }}
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <UCard
            v-for="i in 3"
            :key="i"
            class="bg-accented/5 border-dashed border-border"
          >
            <div class="flex flex-col items-center justify-center p-6 text-center">
              <UIcon
                :name="['i-heroicons-code-bracket', 'i-heroicons-paint-brush', 'i-heroicons-rocket'][i-1]"
                class="w-8 h-8 mb-4 text-primary-400"
              />
              <h3 class="font-semibold mb-2">
                {{ ['Modular', 'Personalizable', 'Listo'][i-1] }}
              </h3>
              <p class="text-xs text-muted">
                Este es un espacio reservado para tu nuevo módulo.
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
.text-muted {
  color: var(--text-secondary);
}
.bg-accented {
  background-color: var(--surface-2);
}
</style>
