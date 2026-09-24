<script setup lang="ts">
import { TermsDocument } from "~/core/terms/TermsDocument";

const { t, locale } = useOwnI18n();

usePageSeo({
  titleKey: "terms.seoTitle",
  descriptionKey: "terms.seoDescription",
  path: "/terms-conditions",
});

const termsDocument = TermsDocument.build();
const companyName = "E3Byte Co., Ltd.";

const lastUpdated = "August 2026";
const effectiveDate = "August 2026";

const showLocalNotice = computed(() => locale.value !== "en");

const { isLoading } = useSkeleton();
</script>

<template>
  <div
    class="bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] pb-20 pt-20 md:pt-28 md:pb-28"
  >
    <div class="shell max-w-4xl">
      <SkeletonBlock v-if="isLoading" heading-width="16rem" :subtitle-lines="1" />

      <template v-else>
        <header class="text-center" v-reveal>
          <div
            class="font-display font-extrabold leading-[1.08] text-primary dark:text-primary-medium text-2xl sm:text-3xl lg:text-4xl"
          >
            {{ t("terms.title") }}
          </div>
          <p class="mt-3 text-sm text-ink-400">
            {{ t("terms.updated", { date: lastUpdated }) }} ·
            {{ t("terms.effective", { date: effectiveDate }) }}
          </p>
        </header>

        <div
          v-if="showLocalNotice"
          v-reveal="{ delay: 80 }"
          class="mt-8 rounded-xl border border-amber-300/60 bg-amber-50 px-5 py-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200"
        >
          {{ t("terms.note") }}
        </div>

        <!-- v-reveal="{ delay: 120 }" -->
        <BaseCard class="mt-8 divide-y divide-transparent">
          <TermsSection
            v-for="section in termsDocument.sections"
            :key="section.id"
            :section="section"
            :company="companyName"
          />
        </BaseCard>
      </template>
    </div>
  </div>
</template>
