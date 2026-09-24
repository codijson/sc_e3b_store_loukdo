<script setup lang="ts">
import type { TermsSection } from "~/core/terms/TermsDocument";

interface Props {
  section: TermsSection;
  company: string;
}

const props = defineProps<Props>();
const { t } = useOwnI18n();

function translate(key: string): string {
  return t(key, { company: props.company });
}
</script>

<template>
  <section
    :id="section.id"
    v-reveal="'up'"
    class="scroll-mt-24 border-t border-ink-900/10 py-8 first:border-t-0 first:pt-0 dark:border-white/10"
  >
    <h2 class="text-xl font-bold text-primary dark:text-primary-medium">
      {{ t(section.titleKey) }}
    </h2>

    <div class="mt-4 space-y-4">
      <template v-for="(sub, index) in section.subsections" :key="index">
        <TermsDefinitionsTable
          v-if="section.id === 'definitions' && sub.list"
          :items="sub.list"
        />

        <template v-else-if="sub.table">
          <h3
            v-if="sub.titleKey"
            class="text-base font-bold text-ink-900 dark:text-white"
          >
            {{ t(sub.titleKey) }}
          </h3>
          <p
            v-if="sub.introKey"
            class="text-sm leading-relaxed text-ink-600 dark:text-ink-200"
          >
            {{ translate(sub.introKey) }}
          </p>
          <TermsTable :table="sub.table" />
          <p
            v-if="sub.outroKey"
            class="text-sm leading-relaxed text-ink-600 dark:text-ink-200"
          >
            {{ translate(sub.outroKey) }}
          </p>
        </template>

        <template v-else>
          <h3
            v-if="sub.titleKey"
            class="text-base font-bold text-ink-900 dark:text-white"
          >
            {{ t(sub.titleKey) }}
          </h3>

          <p
            v-if="sub.introKey"
            class="text-sm leading-relaxed text-ink-600 dark:text-ink-200"
          >
            {{ translate(sub.introKey) }}
          </p>

          <p
            v-for="para in sub.paragraphs"
            :key="para"
            class="text-sm leading-relaxed text-ink-600 dark:text-ink-200"
          >
            {{ translate(para) }}
          </p>

          <ul
            v-if="sub.list"
            class="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-600 dark:text-ink-200"
          >
            <li v-for="item in sub.list" :key="item">{{ t(item) }}</li>
          </ul>

          <p
            v-if="sub.outroKey"
            class="text-sm leading-relaxed text-ink-600 dark:text-ink-200"
          >
            {{ translate(sub.outroKey) }}
          </p>
        </template>
      </template>
    </div>
  </section>
</template>
