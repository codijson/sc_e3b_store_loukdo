<script setup lang="ts">
const { t } = useOwnI18n();

const faqKeys = ["q1", "a1", "q2", "a2", "q3", "a3", "q4", "a4", "q5", "a5"];
const faqs = [1, 2, 3, 4, 5].map(n => ({
  q: `features.faq.q${n}`,
  a: `features.faq.a${n}`,
}));

const openIndex = ref<number | null>(0);

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>

<template>
  <section
    class="bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] pb-20 pt-0 md:pt-0 md:pb-28"
  >
    <div class="shell">
      <SectionHeading v-reveal :title="t('features.faq.title')" />

      <div class="mx-auto mt-10 max-w-3xl space-y-3">
        <div
          v-for="(faq, index) in faqs"
          :key="faq.q"
          v-reveal="{ type: 'up', delay: index * 70 }"
          class="card overflow-hidden"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            :aria-expanded="openIndex === index"
            @click="toggle(index)"
          >
            <span class="font-semibold text-ink-900 dark:text-white">{{ t(faq.q) }}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200"
              :class="openIndex === index ? 'rotate-45' : ''"
            >
              <path d="M12 5v14M5 12h14" stroke-linecap="round" />
            </svg>
          </button>
          <div
            class="grid transition-all duration-200"
            :style="openIndex === index ? 'grid-template-rows: 1fr' : 'grid-template-rows: 0fr'"
          >
            <div class="overflow-hidden">
              <p class="px-5 pb-4 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
                {{ t(faq.a) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
