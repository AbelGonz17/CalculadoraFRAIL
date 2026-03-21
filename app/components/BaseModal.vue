<template>
  <UModal
    v-model:open="open"
    :dismissible="!loading"
    :ui="{ content: 'min-w-lg max-w-fit  max-h-fit' }"
  >
    <!-- Header -->
    <template #header>
      <div class="flex items-center gap-3">
        <div
          v-if="icon"
          class="pm-modal__icon"
        >
          <UIcon
            :name="icon"
            style="width:16px;height:16px;color:white"
          />
        </div>
        <h3 class="pm-modal__title">
          {{ title }}
        </h3>
      </div>
    </template>

    <!-- Body -->
    <template #body>
      <slot />
    </template>

    <!-- Footer -->
    <template
      v-if="props.footer"
      #footer="{ close }"
    >
      <div class="flex justify-end gap-2 w-full">
        <UButton
          color="neutral"
          variant="ghost"
          :disabled="loading"
          @click="close()"
        >
          Cancelar
        </UButton>
        <UButton
          type="submit"
          :form="formId"
          :disabled="loading"
          :loading="loading"
        >
          {{ submitLabel ?? 'Guardar' }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title: string
  submitLabel?: string
  loading?: boolean
  icon?: string
  formId?: string
  footer?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})
</script>

<style scoped>
.pm-modal__icon {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--color-primary-500, #6366f1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pm-modal__title {
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.01em;
}
</style>
