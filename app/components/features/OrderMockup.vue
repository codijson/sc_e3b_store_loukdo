<template>
  <img src="~/assets/images/feature-page/2.svg" alt="" class="rounded-xl max-w-[400px]" />

  <div
    v-if="false"
    class="w-full max-w-[260px] rounded-2xl border border-ink-900/10 bg-white p-4 shadow-soft transition-transform duration-500 hover:-translate-y-1 dark:border-white/10 dark:bg-ink-800"
  >
    <p class="text-xs font-bold text-ink-400">Order Summary</p>
    <div class="mt-3 space-y-2">
      <div class="flex justify-between text-xs text-ink-500 dark:text-ink-300">
        <span>Handwoven basket (x1)</span><span>$25.00</span>
      </div>
      <div class="flex justify-between text-xs text-ink-500 dark:text-ink-300">
        <span>Delivery</span><span>$2.90</span>
      </div>
      <div
        class="flex justify-between border-t border-dashed border-ink-900/10 pt-2 text-sm font-bold text-ink-900 dark:border-white/10 dark:text-white"
      >
        <span>Total</span><span>$27.90</span>
      </div>
    </div>
    <div class="mt-4 flex items-center justify-center rounded-lg bg-ink-50 py-6 dark:bg-white/5">
      <svg viewBox="0 0 40 40" class="h-14 w-14 text-ink-900 dark:text-white" fill="currentColor">
        <rect
          x="2"
          y="2"
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        />
        <rect
          x="28"
          y="2"
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        />
        <rect
          x="2"
          y="28"
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        />
        <rect x="16" y="4" width="3" height="3" />
        <rect x="21" y="8" width="3" height="3" />
        <rect x="16" y="16" width="3" height="3" />
        <rect x="24" y="16" width="3" height="3" />
        <rect x="32" y="16" width="3" height="3" />
        <rect x="16" y="24" width="3" height="3" />
        <rect x="24" y="24" width="3" height="3" />
        <rect x="32" y="24" width="3" height="3" />
        <rect x="20" y="32" width="3" height="3" />
        <rect x="28" y="32" width="3" height="3" />
      </svg>
    </div>
    <button class="mt-4 w-full rounded-full bg-primary py-2.5 text-xs font-bold text-white">
      Confirm Payment
    </button>
  </div>
</template>
