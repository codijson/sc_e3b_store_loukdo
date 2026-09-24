<script setup lang="ts">
interface Props {
  loading?: boolean;
}
withDefaults(defineProps<Props>(), { loading: false });

const { t } = useOwnI18n();
</script>

<template>
  <div class="space-y-4">
    <BaseCard
      v-reveal="{ type: 'left', delay: 0 }"
      class="flex items-start gap-4"
      :loading="loading"
    >
      <span
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-medium"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          class="h-5 w-5"
        >
          <path
            d="M22 4.5L2.6 12.1c-1 .4-1 1.6.1 1.9l4.7 1.5 1.8 5.7c.2.7 1.1.9 1.6.4l2.6-2.6 4.9 3.6c.7.5 1.7.1 1.9-.7L23.9 5.6c.2-.9-.7-1.6-1.9-1.1z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span>
        <h3 class="text-lg font-bold text-ink-900 dark:text-white">
          {{ t("contact.telegramTitle") }}
        </h3>
        <p class="mt-1 text-sm text-ink-500 dark:text-ink-300">
          {{ t("contact.telegramBody") }}
        </p>
        <a
          href="https://t.me/uyheng"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline dark:text-primary-medium"
        >
          {{ t("contact.telegramCta") }} →
        </a>
      </span>
    </BaseCard>

    <BaseCard
      v-reveal="{ type: 'left', delay: 90 }"
      class="flex items-start gap-4"
      :loading="loading"
    >
      <span
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-medium"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          class="h-5 w-5"
        >
          <path
            d="M3 6l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span>
        <h3 class="text-lg font-bold text-ink-900 dark:text-white">
          {{ t("contact.emailTitle") }}
        </h3>
        <a
          :href="`mailto:${t('contact.emailValue')}`"
          target="_blank"
          class="mt-1 block text-sm text-ink-500 hover:text-primary dark:text-ink-300"
        >
          {{ t("contact.emailValue") }}
        </a>
      </span>
    </BaseCard>

    <BaseCard
      v-reveal="{ type: 'left', delay: 180 }"
      class="flex items-start gap-4"
      :loading="loading"
    >
      <span
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-medium"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          class="h-5 w-5"
        >
          <path
            d="M3 5c0-1 1-2 2-2h2l2 5-2 2c1 3 3 5 6 6l2-2 5 2v2c0 1-1 2-2 2C10 20 3 13 3 5z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span>
        <h3 class="text-lg font-bold text-ink-900 dark:text-white">
          {{ t("contact.phoneTitle") }}
        </h3>
        <a
          :href="`tel:${t('contact.phoneValue')}`"
          target="_blank"
          class="mt-1 block text-sm text-ink-500 hover:text-primary dark:text-ink-300"
        >
          {{ t("contact.phoneValue") }}
        </a>
      </span>
    </BaseCard>
  </div>
</template>
