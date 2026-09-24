<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const { locale, locales, setLocale } = useOwnI18n();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

// Pure JS outside-click handler
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const available = computed(() =>
  (locales.value as { code: string; name?: string }[]).map(l => ({
    code: l.code,
    name: l.name ?? l.code,
  }))
);

function choose(code: string) {
  const nextLocale = code as "en" | "km" | "zh";
  setLocale(nextLocale);
  isOpen.value = false;
}
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block">
    <button
      type="button"
      class="flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-white/70 px-3 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:border-brand-400 dark:border-white/10 dark:bg-white/5 dark:text-ink-100"
      @click="isOpen = !isOpen"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
        <path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z" stroke-linecap="round" />
      </svg>
      {{ available.find(l => l.code === locale)?.name }}
    </button>

    <!-- Animated Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="transform scale-95 opacity-0 -translate-y-1"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 -translate-y-1"
    >
      <ul
        v-if="isOpen"
        class="absolute left-0 z-20 mt-2 w-36 overflow-hidden rounded-xl border border-ink-900/10 bg-white shadow-soft dark:border-white/10 dark:bg-ink-800 md:left-auto md:right-0"
      >
        <li v-for="l in available" :key="l.code">
          <button
            type="button"
            class="block w-full px-4 py-2.5 text-left text-sm transition-colors"
            :class="
              l.code === locale
                ? 'bg-brand-50 font-semibold text-brand-600 dark:bg-brand-900/40 dark:text-brand-200'
                : 'text-ink-700 hover:bg-ink-900/5 dark:text-ink-100 dark:hover:bg-white/5'
            "
            @click="choose(l.code)"
          >
            {{ l.name }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>
