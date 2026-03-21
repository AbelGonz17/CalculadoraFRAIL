<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'
import { useAuthStore } from '~/stores/auth'

const { theme, toggleTheme, initTheme } = useTheme()
const isError = ref(false)

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login',
  description: 'Login to your account to continue'
})

interface Schema {
  username: string
  password: string
}

const fields = [
  {
    name: 'username',
    type: 'text',
    label: 'Usuario',
    placeholder: 'sistema',
    icon: 'tabler:user-filled'
  },
  {
    name: 'password',
    type: 'password',
    label: 'Contraseña',
    placeholder: '********',
    icon: 'tabler:lock'
  }
]

const schema = z.object({
  username: z.string().min(1, 'El usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria')
})

const { post } = useApi()
const authStore = useAuthStore()
const toast = useToast()

import { projectConfig } from '~/project.config'

const isLoading = ref(false)

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true
  isError.value = false

  try {
    if (projectConfig.auth.useMock) {
      // simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const mockUser = projectConfig.auth.mockUser
      authStore.setAccessToken(mockUser.token)
      authStore.setUser(mockUser as any)

      toast.add({
        title: `Bienvenido ${mockUser.nameUser}`,
        description: 'Sesión iniciada correctamente (MOCK)',
        color: 'success'
      })
    } else {
      const response = await post<any>('/users/login', event.data)
      authStore.setAccessToken(response.user.token)
      authStore.setUser(response.user)

      toast.add({
        title: `Bienvenido ${response.user.nameUser}`,
        description: 'Sesión iniciada correctamente',
        color: 'success'
      })
    }

    await navigateTo('/')
  } catch (error: any) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="login-page">
    <!-- Brand Header -->

    <!-- Login Card -->
    <UCard
      class="login-card slide-up-enter-active"
      :ui="{
        body: 'p-0',
        header: 'border-b border-border p-6',
        footer: 'p-6'
      }"
    >
      <template #header>
        <div class="flex justify-end w-ful">
          <button
            class="theme-toggle p-1 bg-accented rounded-full flex cursor-pointer"
            :title="theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            @click="toggleTheme"
          >
            <Transition
              name="theme-icon"
              mode="out-in"
            >
              <UIcon
                v-if="theme === 'dark'"
                key="sun"
                name="i-heroicons-sun"
                style="width:16px;height:16px"
              />
              <UIcon
                v-else
                key="moon"
                name="i-heroicons-moon"
                style="width:16px;height:16px"
              />
            </Transition>
          </button>
        </div>

        <div class="text-center items-center justify-center flex flex-col gap-5">
          <img
            :src="projectConfig.logo"
            alt="Logo"
            class="w-10 shadow-xl shadow-primary-500/20"
            @error="(e) => (e.target as HTMLImageElement).src = projectConfig.defaultLogo"
          >
          <div>
            <h2 class="text-2xl font-bold  mb-1">
              Bienvenido
            </h2>
            <p class="text-sm text-muted">
              Ingresa tus credenciales para continuar
            </p>
          </div>
        </div>
      </template>

      <div class="p-6">
        <UAuthForm
          :fields="fields"
          :schema="schema"
          :submit="{
            label: 'Iniciar Sesión',
            color: 'primary',
            variant: 'solid',
            loading: isLoading,
            class: 'w-full py-2.5 rounded-xl font-semibold shadow-lg shadow-primary-500/20 '
          }"
          @submit="onSubmit"
        >
          <template #password-label>
            <div class="flex items-center justify-between w-full">
              <span>Contraseña</span>
              <!-- <ULink
                to="#"
                class="text-xs text-primary-500 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </ULink> -->
            </div>
          </template>

          <template
            v-if="isError"
            #validation
          >
            <UAlert
              color="error"
              icon="i-lucide-info"
              title="Error de autenticación"
              class="mb-4"
            />
          </template>
        </UAuthForm>
      </div>

      <template #footer>
        <p class="text-center text-xs text-muted">
          &copy; {{ new Date().getFullYear() }} {{ projectConfig.name }}. Todos los derechos reservados.
        </p>
      </template>
    </UCard>
  </div>
</template>

<style scoped>
.login-page {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.brand-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.login-card {
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  background: var(--surface-1);
}

:deep(.u-auth-form-fields) {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

:deep(.u-form-group-label) {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

:deep(.u-input) {
  border-radius: 0.75rem !important;
  background: var(--surface-2) !important;
  border-color: var(--border) !important;
}

:deep(.u-input:focus) {
  border-color: var(--color-primary-500) !important;
  box-shadow: 0 0 0 2px var(--accent-glow) !important;
}
</style>
