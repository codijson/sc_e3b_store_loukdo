<script setup lang="ts">
const { t } = useOwnI18n();
const companyName = "E3Byte Co., Ltd.";
</script>

<template>
  <section class="pb-20 pt-0 md:pt-0 md:pb-28">
    <div class="shell">
      <div
        v-reveal="'scale'"
        class="rounded-xl2 border border-primary-light bg-primary-light px-6 py-12 text-center dark:border-primary-dark/50 dark:bg-primary-dark"
      >
        <span
          class="mx-auto flex h-12 w-12 items-center justify-center text-primary dark:text-primary-medium"
        >
          <svg
            width="40"
            height="36"
            viewBox="0 0 40 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 36V0H20V8H40V36H0ZM4 32H16V28H4V32ZM4 24H16V20H4V24ZM4 16H16V12H4V16ZM4 8H16V4H4V8ZM20 32H36V12H20V32ZM24 20V16H32V20H24ZM24 28V24H32V28H24Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <h3 class="mt-4 text-xl font-extrabold text-ink-900 dark:text-white">
          {{ t("about.companyTitle") }}
        </h3>
        <p class="mx-auto mt-3 max-w-xl text-sm text-ink-600 dark:text-ink-200">
          <strong>{{ companyName }}</strong>
        </p>
        <p class="mt-1 text-sm text-ink-500 dark:text-ink-300">
          {{ t("about.companyReg") }}
        </p>
        <p class="mt-1 text-sm text-ink-500 dark:text-ink-300">
          {{ t("about.companyAddress") }}
        </p>
      </div>
    </div>
  </section>
</template>
