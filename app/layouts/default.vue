<template>
  <div class="dash-shell">
    <!-- Sidebar -->
    <aside
      class="dash-sidebar"
      :class="{ collapsed: isSidebarCollapsed }"
    >
      <!-- Brand -->
      <div class="dash-sidebar__brand">
        <div class="dash-sidebar__logo-mark">
          <div class="w-8 h-8 shrink-0">
            <!-- <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg> -->
            <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.1"
              >
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
                <rect
                  width="12"
                  height="8"
                  x="6"
                  y="14"
                  rx="1"
                />
              </g>
            </svg> -->
            <img
              :src="projectConfig.logo"
              alt="Logo"
              @error="(e) => (e.target as HTMLImageElement).src = projectConfig.defaultLogo"
            >
          </div>
          <span class="dash-sidebar__title sidebar-text">{{ projectConfig.name }}</span>
        </div>
        <p class="dash-sidebar__subtitle sidebar-text">
          {{ projectConfig.description }}
        </p>
      </div>

      <!-- Navigation -->
      <nav class="dash-sidebar__nav">
        <p class="dash-nav-group-label sidebar-text">
          Main
        </p>
        <NuxtLink
          v-for="item in navMain"
          :key="item.name"
          :to="item.to"
          class="dash-nav-item "
          :class="{ active: $route.path === item.to }"
          :title="isSidebarCollapsed ? item.name : ''"
        >
          <UIcon
            :name="item.icon"
            class="dash-nav-item__icon"
          />
          <span class="sidebar-text">{{ item.name }}</span>
        </NuxtLink>

        <div
          v-for="group in filteredNavResources"
          :key="group.groupTitle"
        >
          <p
            class="dash-nav-group-label text-highlighted sidebar-text"
            style="margin-top:15px"
          >
            {{ group.groupTitle }}
          </p>
          <div class="text-center w-full" :class="isSidebarCollapsed ? 'opacity-100 p-[8px 12px 6px] ' : 'opacity-0'">
            <span class="text-xl p-0 m-0  font-extrabold text-neutral-300 "> - </span>
          </div>

          <NuxtLink
            v-for="item in group.items"
            :key="item.name"
            :to="item.to"
            class="dash-nav-item"
            :class="{ active: $route.path === item.to }"
            :title="isSidebarCollapsed ? item.name : ''"
          >
            <UIcon
              :name="item.icon"
              class="dash-nav-item__icon"
            />
            <span class="sidebar-text">{{ item.name }}</span>
          </NuxtLink>
        </div>
      </nav>

      <div class="dash-sidebar__footer">
        <div class="flex items-end justify-between dash-sidebar__user">
          <div class="flex items-center gap-3">
            <div class="dash-sidebar__avatar">
              {{ User?.nameUser?.charAt(0) || 'U' }}
            </div>
            <div class="sidebar-text">
              <div class="dash-sidebar__username">
                {{ User?.nameUser ?? 'Usuario' }}
              </div>
              <div class="dash-sidebar__role">
                {{ User?.rol ?? 'Rol' }}
              </div>
            </div>
          </div>
          <button
            class="p-2 transition-colors flex items-center cursor-pointer rounded-lg hover:bg-red-500/10 hover:text-red-300 text-white sidebar-text"
            title="Cerrar Sesión"
            @click="authStore.logout()"
          >
            <UIcon
              name="i-heroicons-arrow-right-on-rectangle"
              class="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Area -->
    <div
      class="dash-main"
      :class="{ collapsed: isSidebarCollapsed }"
    >
      <!-- Top Bar -->
      <header class="dash-topbar">
        <div class="flex items-center gap-4">
          <button
            class="dash-topbar__icon-btn"
            title="Contraer/Expandir Menú"
            @click="isSidebarCollapsed = !isSidebarCollapsed"
          >
            <UIcon
              name="i-heroicons-bars-3"
              style="width:20px;height:20px"
            />
          </button>
          <div class="dash-topbar__breadcrumb">
            Sistema / <span>{{ currentPageName }}</span>
          </div>
        </div>
        <div class="dash-topbar__actions">
          <!-- Theme Toggle -->
          <button
            class="dash-topbar__icon-btn theme-toggle"
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

          <button
            class="dash-topbar__icon-btn"
            title="Notificaciones"
          >
            <UIcon
              name="i-heroicons-bell"
              style="width:16px;height:16px"
            />
          </button>
          <button
            v-if="ability.can('manage', 'all')"
            class="dash-topbar__icon-btn"
            title="Configuración"
          >
            <UIcon
              name="i-heroicons-cog-6-tooth"
              style="width:16px;height:16px"
            />
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="dash-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAbility } from '@casl/vue'
import { projectConfig } from '~/project.config'

const route = useRoute()
const { theme, toggleTheme, initTheme } = useTheme()
const isSidebarCollapsed = ref(false)

const navMain: NavItem[] = [
  { name: 'Dashboard', to: '/', icon: 'i-heroicons-squares-2x2' },
  
  
]

const ability = useAbility()

// Navigation resources - simplified to only Dashboard by default
// User can add their own groups here
interface NavItem {
  name: string
  to: string
  icon: string
  action?: string
  subject?: string
}

interface NavGroup {
  groupTitle: string
  items: NavItem[]
}

const navResources = ref<NavGroup[]>([
  {
    groupTitle: 'Recursos',
    items: [
      { name: 'Compañias', to: '/company', icon: 'i-heroicons-building-office-2', action: 'read', subject: 'example' },
    ]
  }
])

const filteredNavResources = computed(() => {
  return navResources.value.map(group => ({
    ...group,
    items: group.items.filter(item => ability.can(item.action as any || 'read', item.subject as any))
  })).filter(group => group.items.length > 0)
})

const allNav = computed(() => [...navMain, ...navResources.value.flatMap(group => group.items)])

const currentPageName = computed(() => {
  const found = allNav.value.find(n => n.to === route.path)
  return found?.name ?? 'Página'
})

const authStore = useAuthStore()
const { user: User } = storeToRefs(authStore)

onMounted(() => {
  initTheme()
})
</script>

<style scoped>
/* ── Theme icon swap animation ──────────────────────────── */
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: opacity 0.15s ease, transform 0.2s ease;
}
.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-30deg) scale(0.7);
}
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(30deg) scale(0.7);
}
</style>
