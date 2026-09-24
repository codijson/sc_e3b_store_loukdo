<script setup lang="ts">
const { t } = useOwnI18n();

const steps = [
  {
    titleKey: "features.steps.step1Title",
    bodyKey: "features.steps.step1Body",
  },
  {
    titleKey: "features.steps.step2Title",
    bodyKey: "features.steps.step2Body",
  },
  {
    titleKey: "features.steps.step3Title",
    bodyKey: "features.steps.step3Body",
  },
];
</script>

<template>
  <section class="pb-20 pt-0 md:pt-0 md:pb-28">
    <div class="shell">
      <SectionHeading
        v-reveal
        :title="t('features.steps.title')"
        :subtitle="t('features.steps.subtitle')"
      />

      <div class="mt-14 grid gap-6 md:grid-cols-3">
        <BaseCard
          v-for="(step, index) in steps"
          :key="step.titleKey"
          v-reveal="{ type: 'up', delay: index * 100 }"
          class="text-center"
        >
          <span
            class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-lg font-extrabold text-primary-dark dark:bg-primary-dark dark:text-primary-medium"
          >
            {{ index + 1 }}
          </span>
          <h3 class="mt-4 text-lg font-bold text-ink-900 dark:text-white">
            {{ t(step.titleKey) }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
            {{ t(step.bodyKey) }}
          </p>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
