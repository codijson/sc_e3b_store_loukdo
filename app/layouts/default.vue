<script setup lang="ts"></script>

<template>
  <div
    class="flex min-h-screen flex-col bg-[var(--surface-light)] text-ink-900 dark:bg-[var(--surface-dark)] dark:text-ink-50"
  >
    <AppHeader />
    <!-- h-16 spacer compensates for the header's fixed positioning -->
    <div class="h-16 shrink-0" aria-hidden="true" />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <ScrollFab />
  </div>
</template>
