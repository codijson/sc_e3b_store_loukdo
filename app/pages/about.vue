<script setup lang="ts">
import type { SeoImage } from "@/core/seo/SeoBuilder";
import aboutImageUrl from "/og/about-us-v1.png";

const { t } = useOwnI18n();

const DEFAULT_IMAGE: SeoImage = {
  url: `https://loukdo.com${aboutImageUrl}`,
  width: 588,
  height: 384,
  alt: t("about.seoDescription"),
};

usePageSeo({
  titleKey: "about.seoTitle",
  descriptionKey: "about.seoDescription",
  path: "/about",
  image: DEFAULT_IMAGE,
});

const { isLoading } = useSkeleton();
</script>

<template>
  <div>
    <section
      class="bg-[var(--surface-light)] text-center dark:bg-[var(--surface-dark)] pb-20 pt-20 md:pt-28 md:pb-28"
    >
      <div class="shell">
        <SkeletonBlock v-if="isLoading" heading-width="24rem" />
        <template v-else>
          <div
            v-reveal
            class="font-display font-extrabold leading-[1.08] text-primary dark:text-primary-medium text-2xl sm:text-3xl lg:text-4xl"
          >
            {{ t("about.title") }}
          </div>
          <p
            v-reveal="{ delay: 100 }"
            class="mx-auto mt-5 max-w-2xl text-base text-ink-500 dark:text-ink-300 md:text-lg"
          >
            {{ t("about.subtitle") }}
          </p>
        </template>
      </div>
    </section>

    <template v-if="!isLoading">
      <StorySection />
      <BeliefsSection />
      <WhatWeDoSection />
      <CompanySection />
    </template>
  </div>
</template>
