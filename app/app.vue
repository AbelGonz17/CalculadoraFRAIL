<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- <UNotifications /> -->
  </UApp>
</template>

<script setup lang="ts">
import { projectConfig } from '~/project.config'

const logo = ref(projectConfig.logo)

const themeStyles = computed(() => {
  const { dark, light, radius, sidebarWidth } = projectConfig.theme
  
  return `
    :root {
      --ui-radius: ${radius}rem;
      --sidebar-width: ${sidebarWidth}px;
      
      --surface-0: ${dark.surface0};
      --surface-1: ${dark.surface1};
      --surface-2: ${dark.surface2};
      --surface-3: ${dark.surface3};
      --border: ${dark.border};
      --border-hover: ${dark.borderHover};
      --text-primary: ${dark.textPrimary};
      --text-secondary: ${dark.textSecondary};
      --text-muted: ${dark.textMuted};

      /* Map Nuxt UI primary to our template accent and legacy primary variables */
      --accent: var(--ui-primary);
      --accent-soft: color-mix(in srgb, var(--ui-primary) 12%, transparent);
      --accent-glow: color-mix(in srgb, var(--ui-primary) 25%, transparent);
      
      --color-primary-500: var(--ui-primary);
      --color-primary-600: var(--ui-primary);
    }

    html[data-theme="light"],
    html:not(.dark) {
      --surface-0: ${light.surface0};
      --surface-1: ${light.surface1};
      --surface-2: ${light.surface2};
      --surface-3: ${light.surface3};
      --border: ${light.border};
      --border-hover: ${light.borderHover};
      --text-primary: ${light.textPrimary};
      --text-secondary: ${light.textSecondary};
      --text-muted: ${light.textMuted};
    }
  `
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${projectConfig.name}` : projectConfig.name
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: logo }
  ],
  style: [
    { innerHTML: themeStyles }
  ],
  script: [
    {
      innerHTML: `
(function () {
  function getTheme() {
    return 'light';
  }

  const theme = getTheme();
  const root = document.documentElement;

  // Apply immediately to prevent flash
  root.classList.add('no-transitions');
  root.setAttribute('data-theme', theme);
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Sync with Nuxt UI color mode if it exists
  window.localStorage.setItem('nuxt-color-mode', theme);

  setTimeout(() => {
    root.classList.remove('no-transitions');
  }, 0);
})();
      `,
      type: 'text/javascript',
      tagPosition: 'head'
    }
  ]
})

onMounted(async () => {
  // Simple check to see if the logo exists
  if (projectConfig.logo !== projectConfig.defaultLogo) {
    try {
      const res = await fetch(projectConfig.logo, { method: 'HEAD' })
      if (!res.ok) {
        logo.value = projectConfig.defaultLogo
      }
    } catch {
      logo.value = projectConfig.defaultLogo
    }
  }
})
</script>
