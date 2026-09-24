<script setup lang="ts">
const props = defineProps<{
  error: { statusCode?: number; message?: string };
}>();

function handleClear() {
  clearError({ redirect: "/" });
}
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-[var(--surface-light)] px-6 text-center dark:bg-[var(--surface-dark)]"
  >
    <p class="text-sm font-bold uppercase tracking-widest text-brand-500">
      {{ props.error?.statusCode ?? 404 }}
    </p>
    <h1 class="mt-3 font-display text-3xl font-extrabold text-ink-900 dark:text-white">
      {{ props.error?.statusCode === 404 ? "This page doesn't exist" : "Something went wrong" }}
    </h1>
    <p class="mt-3 max-w-md text-sm text-ink-500 dark:text-ink-300">
      {{ props.error?.message || "Let's get you back to Loukdo." }}
    </p>
    <button
      type="button"
      class="mt-6 inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
      @click="handleClear"
    >
      Back to home
    </button>
  </div>
</template>
