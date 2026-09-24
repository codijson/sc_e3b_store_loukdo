<script setup lang="ts">
interface Props {
  loading?: boolean;
}
withDefaults(defineProps<Props>(), { loading: false });

const { t } = useOwnI18n();

const pillars = [
  {
    titleKey: "about.omnichatTitle",
    bodyKey: "about.omnichatBody",
    icon: `<svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 30V3C0 2.175 0.29375 1.46875 0.88125 0.88125C1.46875 0.29375 2.175 0 3 0H27C27.825 0 28.5312 0.29375 29.1187 0.88125C29.7062 1.46875 30 2.175 30 3V21C30 21.825 29.7062 22.5312 29.1187 23.1187C28.5312 23.7062 27.825 24 27 24H6L0 30ZM6 18H18V15H6V18ZM6 13.5H24V10.5H6V13.5ZM6 9H24V6H6V9Z" fill="currentColor"/></svg>`,
  },
  {
    titleKey: "about.ordersTitle",
    bodyKey: "about.ordersBody",
    icon: `<svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 30C8.175 30 7.46875 29.7062 6.88125 29.1187C6.29375 28.5312 6 27.825 6 27C6 26.175 6.29375 25.4688 6.88125 24.8813C7.46875 24.2938 8.175 24 9 24C9.825 24 10.5312 24.2938 11.1187 24.8813C11.7062 25.4688 12 26.175 12 27C12 27.825 11.7062 28.5312 11.1187 29.1187C10.5312 29.7062 9.825 30 9 30ZM24 30C23.175 30 22.4688 29.7062 21.8813 29.1187C21.2938 28.5312 21 27.825 21 27C21 26.175 21.2938 25.4688 21.8813 24.8813C22.4688 24.2938 23.175 24 24 24C24.825 24 25.5312 24.2938 26.1187 24.8813C26.7062 25.4688 27 26.175 27 27C27 27.825 26.7062 28.5312 26.1187 29.1187C25.5312 29.7062 24.825 30 24 30ZM6.3 3H28.425C29 3 29.4375 3.25625 29.7375 3.76875C30.0375 4.28125 30.05 4.8 29.775 5.325L24.45 14.925C24.175 15.425 23.8062 15.8125 23.3438 16.0875C22.8813 16.3625 22.375 16.5 21.825 16.5H10.65L9 19.5H27V22.5H9C7.875 22.5 7.025 22.0062 6.45 21.0187C5.875 20.0312 5.85 19.05 6.375 18.075L8.4 14.4L3 3H0V0H4.875L6.3 3Z" fill="currentColor"/></svg>`,
  },
  {
    titleKey: "about.productsTitle",
    bodyKey: "about.productsBody",
    icon: `<svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 30C3.675 30 2.96875 29.7062 2.38125 29.1187C1.79375 28.5312 1.5 27.825 1.5 27V10.0875C1.05 9.8125 0.6875 9.45625 0.4125 9.01875C0.1375 8.58125 0 8.075 0 7.5V3C0 2.175 0.29375 1.46875 0.88125 0.88125C1.46875 0.29375 2.175 0 3 0H27C27.825 0 28.5312 0.29375 29.1187 0.88125C29.7062 1.46875 30 2.175 30 3V7.5C30 8.075 29.8625 8.58125 29.5875 9.01875C29.3125 9.45625 28.95 9.8125 28.5 10.0875V27C28.5 27.825 28.2062 28.5312 27.6187 29.1187C27.0312 29.7062 26.325 30 25.5 30H4.5ZM3 7.5H27V3H3V7.5ZM10.5 18H19.5V15H10.5V18Z" fill="currentColor"/></svg>`,
  },
  {
    titleKey: "about.deliveryTitle",
    bodyKey: "about.deliveryBody",
    icon: `<svg width="20" height="20" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 24C6.25 24 5.1875 23.5625 4.3125 22.6875C3.4375 21.8125 3 20.75 3 19.5H0V3C0 2.175 0.29375 1.46875 0.88125 0.88125C1.46875 0.29375 2.175 0 3 0H24V6H28.5L33 12V19.5H30C30 20.75 29.5625 21.8125 28.6875 22.6875C27.8125 23.5625 26.75 24 25.5 24C24.25 24 23.1875 23.5625 22.3125 22.6875C21.4375 21.8125 21 20.75 21 19.5H12C12 20.75 11.5625 21.8125 10.6875 22.6875C9.8125 23.5625 8.75 24 7.5 24ZM7.5 21C7.925 21 8.28125 20.8563 8.56875 20.5688C8.85625 20.2812 9 19.925 9 19.5C9 19.075 8.85625 18.7188 8.56875 18.4312C8.28125 18.1437 7.925 18 7.5 18C7.075 18 6.71875 18.1437 6.43125 18.4312C6.14375 18.7188 6 19.075 6 19.5C6 19.925 6.14375 20.2812 6.43125 20.5688C6.71875 20.8563 7.075 21 7.5 21ZM25.5 21C25.925 21 26.2812 20.8563 26.5688 20.5688C26.8563 20.2812 27 19.925 27 19.5C27 19.075 26.8563 18.7188 26.5688 18.4312C26.2812 18.1437 25.925 18 25.5 18C25.075 18 24.7188 18.1437 24.4312 18.4312C24.1437 18.7188 24 19.075 24 19.5C24 19.925 24.1437 20.2812 24.4312 20.5688C24.7188 20.8563 25.075 21 25.5 21ZM24 13.5H30.375L27 9H24V13.5Z" fill="currentColor"/></svg>`,
  },
];
</script>

<template>
  <section class="pb-20 pt-0 md:pt-0 md:pb-28">
    <div class="shell">
      <SectionHeading
        v-reveal
        :title="t('about.doTitle')"
        :subtitle="t('about.doSubtitle')"
        :loading="loading"
      />

      <div class="mt-12 grid gap-5 sm:grid-cols-2">
        <BaseCard
          v-for="(pillar, index) in pillars"
          :key="pillar.titleKey"
          v-reveal="{ type: 'up', delay: index * 80 }"
          class="flex items-start gap-4"
          :loading="loading"
        >
          <span
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-medium"
          >
            <span v-html="pillar.icon"></span>
          </span>
          <span>
            <h3 class="text-base font-bold text-ink-900 dark:text-white">
              {{ t(pillar.titleKey) }}
            </h3>
            <p class="mt-1.5 text-sm text-ink-500 dark:text-ink-300">
              {{ t(pillar.bodyKey) }}
            </p>
          </span>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
