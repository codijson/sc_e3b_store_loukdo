<script setup lang="ts">
import type { SeoImage } from "@/core/seo/SeoBuilder";
import featureImageUrl from "/og/feature-1-v1.png";

const { t } = useOwnI18n();

const DEFAULT_IMAGE: SeoImage = {
  url: `${import.meta.env.NUXT_PUBLIC_SITE_URL}${featureImageUrl}`,
  width: 539,
  height: 405,
  alt: t("features.seoDescription"),
};

usePageSeo({
  titleKey: "features.seoTitle",
  descriptionKey: "features.seoDescription",
  path: "/features",
  image: DEFAULT_IMAGE,
});

const omnichatPoints = [
  "features.omnichat.point1",
  "features.omnichat.point2",
  "features.omnichat.point3",
  "features.omnichat.point4",
  "features.omnichat.point5",
];

const orderPoints = ["features.orders.point1", "features.orders.point2", "features.orders.point3"];

const { isLoading } = useSkeleton();

const omichat1Icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 20L16 16H6C5.45 16 4.97917 15.8042 4.5875 15.4125C4.19583 15.0208 4 14.55 4 14V13H15C15.55 13 16.0208 12.8042 16.4125 12.4125C16.8042 12.0208 17 11.55 17 11V4H18C18.55 4 19.0208 4.19583 19.4125 4.5875C19.8042 4.97917 20 5.45 20 6V20ZM2 10.175L3.175 9H13V2H2V10.175ZM0 15V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H13C13.55 0 14.0208 0.195833 14.4125 0.5875C14.8042 0.979167 15 1.45 15 2V9C15 9.55 14.8042 10.0208 14.4125 10.4125C14.0208 10.8042 13.55 11 13 11H4L0 15ZM2 9V2V9Z" fill="currentColor"/></svg>`;

const omichat2Icon = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 8L9.6 6.6L11.175 5H7V3H11.175L9.575 1.4L11 0L15 4L11 8ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18C4 17.45 4.19583 16.9792 4.5875 16.5875C4.97917 16.1958 5.45 16 6 16C6.55 16 7.02083 16.1958 7.4125 16.5875C7.80417 16.9792 8 17.45 8 18C8 18.55 7.80417 19.0208 7.4125 19.4125C7.02083 19.8042 6.55 20 6 20ZM16 20C15.45 20 14.9792 19.8042 14.5875 19.4125C14.1958 19.0208 14 18.55 14 18C14 17.45 14.1958 16.9792 14.5875 16.5875C14.9792 16.1958 15.45 16 16 16C16.55 16 17.0208 16.1958 17.4125 16.5875C17.8042 16.9792 18 17.45 18 18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20ZM0 2V0H3.275L7.525 9H14.525L18.425 2H20.7L16.3 9.95C16.1167 10.2833 15.8708 10.5417 15.5625 10.725C15.2542 10.9083 14.9167 11 14.55 11H7.1L6 13H18V15H6C5.25 15 4.67917 14.675 4.2875 14.025C3.89583 13.375 3.88333 12.7167 4.25 12.05L5.6 9.6L2 2H0Z" fill="currentColor"/></svg>`;
</script>

<template>
  <div>
    <section
      class="bg-[var(--surface-light)] text-center dark:bg-[var(--surface-dark)] pb-20 pt-20 md:pt-28 md:pb-28"
    >
      <div class="shell">
        <SkeletonBlock v-if="isLoading" heading-width="20rem" />
        <template v-else>
          <div
            v-reveal
            class="font-display font-extrabold leading-[1.08] text-primary dark:text-primary-medium text-2xl sm:text-3xl lg:text-4xl"
          >
            {{ t("features.title") }}
          </div>
          <p
            v-reveal="{ delay: 100 }"
            class="mx-auto mt-5 max-w-2xl text-base text-ink-500 dark:text-ink-300 md:text-lg"
          >
            {{ t("features.subtitle") }}
          </p>
        </template>
      </div>
    </section>

    <section v-if="!isLoading" class="pb-20 pt-0 md:pt-0 md:pb-28">
      <div class="shell space-y-20 md:space-y-28">
        <FeatureShowcase
          v-reveal="'left'"
          title-key="features.omnichat.title"
          body-key="features.omnichat.body"
          :points="omnichatPoints"
          cta-key="features.omnichat.cta"
          icon-path="M8 12h8m-8 4h5m-9 5l1.7-3.4A9 9 0 1112 21c-1.5 0-2.9-.4-4.1-1L4 21l1-4z"
          :icon="omichat1Icon"
        >
          <template #visual>
            <InboxMockup />
          </template>
        </FeatureShowcase>

        <FeatureShowcase
          v-reveal="'right'"
          title-key="features.orders.title"
          body-key="features.orders.body"
          :points="orderPoints"
          cta-key="features.orders.cta"
          icon-path="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.98-4.684 2.57-7.152.107-.45-.238-.898-.7-.898H5.106M7.5 14.25L5.106 5.272M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          reverse
          :icon="omichat2Icon"
        >
          <template #visual>
            <OrderMockup />
          </template>
        </FeatureShowcase>
      </div>
    </section>

    <template v-if="!isLoading">
      <StepsSection />
      <FaqSection />
    </template>
  </div>
</template>
