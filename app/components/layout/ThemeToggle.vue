<script setup lang="ts">
const { preference, setTheme } = useTheme();

const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});

const options: {
  value: "light" | "system" | "dark";
  icon: string;
}[] = [
  {
    value: "light",
    icon: "M12 3v1.5M12 19.5V21M4.5 12H3M21 12h-1.5M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M18.4 5.6l-1.1 1.1M6.7 17.3l-1.1 1.1M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z",
  },
  {
    value: "system",
    icon: "M4.5 5.25A1.5 1.5 0 016 3.75h12a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0118 15.75H6a1.5 1.5 0 01-1.5-1.5v-9zM9.75 19.5h4.5M12 15.75V19.5",
  },
  {
    value: "dark",
    icon: "M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z",
  },
];

const { t } = useOwnI18n();
</script>

<template>
  <div
    class="flex items-center gap-0.5 rounded-full border border-ink-900/10 bg-white/70 p-1 dark:border-white/10 dark:bg-white/5"
    role="group"
    :aria-label="t('a11y.themeToggle')"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-200"
      :class="
        mounted && preference === option.value
          ? 'bg-brand-500 text-white'
          : 'text-ink-500 hover:bg-ink-900/5 dark:text-ink-200 dark:hover:bg-white/10'
      "
      :aria-pressed="mounted ? preference === option.value : false"
      :aria-label="t(`theme.${option.value}`)"
      @click="setTheme(option.value)"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
        <path :d="option.icon" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>
