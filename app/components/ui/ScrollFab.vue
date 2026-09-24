<script setup lang="ts">
const { t } = useOwnI18n();

const isVisible = ref(false);
const canScrollUp = ref(false);

function updateScrollState() {
  const scrollY = window.scrollY;

  isVisible.value = scrollY > 280;
  canScrollUp.value = scrollY > 240;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateScrollState();
    ticking = false;
  });
}

onMounted(() => {
  updateScrollState();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed bottom-5 right-4 z-40 flex flex-col gap-2.5 sm:bottom-8 sm:right-6"
  >
    <transition name="fab">
      <button
        v-if="canScrollUp"
        type="button"
        :aria-label="t('a11y.scrollToTop')"
        class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-soft-dark ring-1 ring-inset ring-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-500 active:translate-y-0 dark:bg-brand-500 dark:hover:bg-brand-400"
        @click="scrollToTop"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="h-5 w-5"
        >
          <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </transition>
  </div>
</template>
