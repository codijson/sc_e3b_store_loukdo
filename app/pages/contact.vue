<script setup lang="ts">
import type { SeoImage } from "@/core/seo/SeoBuilder";
import contactImageUrl from "/og/contact-v1.png";

const { t } = useOwnI18n();

const DEFAULT_IMAGE: SeoImage = {
  url: `${import.meta.env.NUXT_PUBLIC_SITE_URL}${contactImageUrl}`,
  width: 1200,
  height: 302,
  alt: t("contact.seoDescription"),
};

usePageSeo({
  titleKey: "contact.seoTitle",
  descriptionKey: "contact.seoDescription",
  path: "/contact",
  image: DEFAULT_IMAGE,
});

const { isLoading } = useSkeleton();
</script>

<template>
  <ClientOnly>
    <div>
      <section
        class="bg-[var(--surface-light)] text-center dark:bg-[var(--surface-dark)] pb-20 pt-20 md:pt-28 md:pb-28"
      >
        <div class="shell">
          <SkeletonBlock v-if="isLoading" heading-width="18rem" />
          <template v-else>
            <div
              v-reveal
              class="font-display font-extrabold leading-[1.08] text-primary dark:text-primary-medium text-2xl sm:text-3xl lg:text-4xl"
            >
              {{ t("contact.title") }}
            </div>
            <p
              v-reveal="{ delay: 100 }"
              class="mx-auto mt-5 max-w-xl text-base text-ink-500 dark:text-ink-300 md:text-lg"
            >
              {{ t("contact.subtitle") }}
            </p>
          </template>
        </div>
      </section>

      <section class="pb-20 pt-0 md:pt-0 md:pb-28">
        <div class="shell grid gap-6 lg:grid-cols-2">
          <div v-reveal="'left'">
            <ContactChannels :loading="isLoading" />
          </div>
          <div v-reveal="{ type: 'right', delay: 100 }">
            <ContactForm :loading="isLoading" />
          </div>
        </div>
      </section>

      <MapSection v-if="!isLoading" />
    </div>
  </ClientOnly>
</template>
