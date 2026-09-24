<script setup lang="ts">
interface Props {
  loading?: boolean;
}
withDefaults(defineProps<Props>(), { loading: false });

const { t } = useOwnI18n();

const beliefs = [
  {
    titleKey: "about.belief1Title",
    bodyKey: "about.belief1Body",
    icon: `<svg width="20" height="20" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 24V19.8C0 18.95 0.21875 18.1687 0.65625 17.4562C1.09375 16.7437 1.675 16.2 2.4 15.825C3.95 15.05 5.525 14.4688 7.125 14.0813C8.725 13.6938 10.35 13.5 12 13.5C13.65 13.5 15.275 13.6938 16.875 14.0813C18.475 14.4688 20.05 15.05 21.6 15.825C22.325 16.2 22.9062 16.7437 23.3438 17.4562C23.7812 18.1687 24 18.95 24 19.8V24H0ZM27 24V19.5C27 18.4 26.6937 17.3438 26.0812 16.3312C25.4688 15.3187 24.6 14.45 23.475 13.725C24.75 13.875 25.95 14.1312 27.075 14.4937C28.2 14.8562 29.25 15.3 30.225 15.825C31.125 16.325 31.8125 16.8813 32.2875 17.4937C32.7625 18.1062 33 18.775 33 19.5V24H27ZM12 12C10.35 12 8.9375 11.4125 7.7625 10.2375C6.5875 9.0625 6 7.65 6 6C6 4.35 6.5875 2.9375 7.7625 1.7625C8.9375 0.5875 10.35 0 12 0C13.65 0 15.0625 0.5875 16.2375 1.7625C17.4125 2.9375 18 4.35 18 6C18 7.65 17.4125 9.0625 16.2375 10.2375C15.0625 11.4125 13.65 12 12 12ZM27 6C27 7.65 26.4125 9.0625 25.2375 10.2375C24.0625 11.4125 22.65 12 21 12C20.725 12 20.375 11.9688 19.95 11.9062C19.525 11.8438 19.175 11.775 18.9 11.7C19.575 10.9 20.0938 10.0125 20.4562 9.0375C20.8187 8.0625 21 7.05 21 6C21 4.95 20.8187 3.9375 20.4562 2.9625C20.0938 1.9875 19.575 1.1 18.9 0.3C19.25 0.175 19.6 0.09375 19.95 0.05625C20.3 0.01875 20.65 0 21 0C22.65 0 24.0625 0.5875 25.2375 1.7625C26.4125 2.9375 27 4.35 27 6Z" fill="currentColor"/></svg>`,
  },
  {
    titleKey: "about.belief2Title",
    bodyKey: "about.belief2Body",
    icon: `<svg width="20" height="20" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.35 30L23.175 12H26.325L33.15 30H30L28.3875 25.425H21.1125L19.5 30H16.35ZM4.5 25.5L2.4 23.4L9.975 15.825C9.1 14.95 8.30625 13.95 7.59375 12.825C6.88125 11.7 6.225 10.425 5.625 9H8.775C9.275 9.975 9.775 10.825 10.275 11.55C10.775 12.275 11.375 13 12.075 13.725C12.9 12.9 13.7563 11.7438 14.6438 10.2563C15.5312 8.76875 16.2 7.35 16.65 6H0V3H10.5V0H13.5V3H24V6H19.65C19.125 7.8 18.3375 9.65 17.2875 11.55C16.2375 13.45 15.2 14.9 14.175 15.9L17.775 19.575L16.65 22.65L12.075 17.9625L4.5 25.5ZM22.05 22.8H27.45L24.75 15.15L22.05 22.8Z" fill="currentColor"/></svg>`,
  },
  {
    titleKey: "about.belief3Title",
    bodyKey: "about.belief3Body",
    icon: `<svg width="20" height="20" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L0 9L9 0L11.1375 2.1375L4.2375 9.0375L11.1 15.9L9 18ZM21 18L18.8625 15.8625L25.7625 8.9625L18.9 2.1L21 0L30 9L21 18Z" fill="currentColor"/></svg>`,
  },
];
</script>

<template>
  <section
    class="bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] pb-20 pt-0 md:pt-0 md:pb-28"
  >
    <div class="shell">
      <SectionHeading v-reveal :title="t('about.beliefsTitle')" :loading="loading" />

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <BaseCard
          v-for="(belief, index) in beliefs"
          :key="belief.titleKey"
          v-reveal="{ type: 'up', delay: index * 90 }"
          :loading="loading"
        >
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-medium"
          >
            <span v-html="belief?.icon"></span>
          </div>
          <h3 class="mt-5 text-lg font-bold text-ink-900 dark:text-white">
            {{ t(belief.titleKey) }}
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
            {{ t(belief.bodyKey) }}
          </p>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
