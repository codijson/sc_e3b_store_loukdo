<script setup lang="ts">
import type { SeoImage } from "@/core/seo/SeoBuilder";

import homeImageUrl from "/og/home-v1.png";

const { t } = useOwnI18n();

const DEFAULT_IMAGE: SeoImage = {
  url: `${import.meta.env.NUXT_PUBLIC_SITE_URL}${homeImageUrl}`,
  width: 588,
  height: 331,
  alt: "Loukdo — Chat. Order. Delivered.",
};

usePageSeo({
  titleKey: "home.seoTitle",
  descriptionKey: "home.seoDescription",
  path: "/",
  image: DEFAULT_IMAGE,
});

const { isLoading } = useSkeleton();
</script>

<template>
  <div>
    <section
      v-if="isLoading"
      class="bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] pb-20 pt-20 md:pt-28 md:pb-28"
    >
      <div class="shell">
        <SkeletonBlock align="left" heading-width="26rem" :subtitle-lines="2" />
      </div>
    </section>
    <template v-else>
      <HeroSection />
      <ProblemSection />
      <ChaosSection />
    </template>
  </div>
</template>
