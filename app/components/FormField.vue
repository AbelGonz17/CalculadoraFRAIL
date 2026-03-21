<template>
  <div>
    <label class="pm-field__label">{{ label }}<span v-if="required" style="color:var(--color-danger);margin-left:2px">*</span></label>
    <p v-if="hint" class="pm-field__hint">{{ hint }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  required?: boolean
  hint?: string
}>()
</script>

<style scoped>
.pm-field__label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.pm-field__hint {
  font-size: 11px;
  color: var(--text-muted);
  margin: -2px 0 6px;
}
</style>
