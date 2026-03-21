<template>
  <div class="auth-layout">
    <div class="auth-layout__bg">
      <div class="auth-layout__glow auth-layout__glow--1" />
      <div class="auth-layout__glow auth-layout__glow--2" />
    </div>
    <div class="auth-layout__content relative z-10 w-full flex flex-col items-center justify-center min-h-screen p-4">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  position: relative;
  min-height: 100vh;
  background: var(--surface-0);
  overflow: hidden;
}

.auth-layout__bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.auth-layout__glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
}

.auth-layout__glow--1 {
  top: -100px;
  left: -100px;
  background: var(--accent);
}

.auth-layout__glow--2 {
  bottom: -100px;
  right: -100px;
  background: var(--color-success);
}

@media (prefers-color-scheme: light) {
  .auth-layout__glow {
    opacity: 0.1;
  }
}
</style>
