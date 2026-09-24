<script setup lang="ts">
const { t } = useOwnI18n();
</script>

<template>
  <section class="pb-20 pt-0 md:pt-0 md:pb-28">
    <div class="shell grid gap-10 md:grid-cols-2 md:items-center">
      <div v-reveal="'left'">
        <h2 class="text-2xl font-extrabold text-ink-900 dark:text-white md:text-3xl">
          {{ t("about.storyTitle") }}
        </h2>
        <p class="mt-4 text-sm leading-relaxed text-ink-500 dark:text-ink-300 md:text-base">
          {{ t("about.storyBody") }}
        </p>
      </div>

      <div
        v-reveal="'right'"
        class="rounded-xl2 border border-ink-900/10 bg-gradient-to-br from-amber-50 to-white dark:border-white/10 dark:from-amber-900/10 dark:to-transparent"
        role="img"
        :aria-label="t('about.storyImageAlt')"
      >
        <img src="~/assets/images/about-page/1.svg" alt="" class="rounded-xl max-w-auto" />
        <div
          v-if="false"
          class="rounded-xl border border-ink-900/10 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-ink-800"
        >
          <div class="space-y-2">
            <span
              v-for="i in 6"
              :key="i"
              class="block h-2 rounded bg-ink-100 dark:bg-white/10"
              :style="{ width: `${70 - i * 5}%` }"
            />
          </div>
          <div
            class="mt-5 flex items-center gap-3 border-t border-dashed border-ink-900/10 pt-4 dark:border-white/10"
          >
            <span
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                class="h-5 w-5"
              >
                <path
                  d="M3 8l9 6 9-6M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span class="text-xs font-semibold text-ink-400">Loukdo · Chat Order</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
