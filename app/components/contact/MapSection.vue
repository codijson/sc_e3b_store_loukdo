<script setup lang="ts">
const { t } = useOwnI18n();

const LATITUDE = 11.583552;
const LONGITUDE = 104.897249;

// https://maps.app.goo.gl/VMWyrY4yPcnBVQDV7
const mapEmbedSrc = computed(
  () => `https://www.google.com/maps?q=${LATITUDE},${LONGITUDE}&z=15&output=embed`
);
</script>

<template>
  <section class="pb-20 md:pb-28">
    <div class="shell h-[250px]">
      <BaseCard
        v-reveal="'scale'"
        :padded="false"
        class="grid h-full overflow-hidden md:grid-cols-2"
      >
        <iframe
          :src="mapEmbedSrc"
          :title="t('contact.mapAlt')"
          class="h-72 w-full border-0 md:h-full"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />

        <div
          class="flex h-full w-full shrink-0 flex-col items-start justify-center p-6 text-left md:p-8"
        >
          <div class="flex items-center gap-2 text-primary dark:text-primary-medium">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              class="h-5 w-5"
            >
              <path
                d="M12 21s-7-6.1-7-11a7 7 0 0114 0c0 4.9-7 11-7 11zm0-8a3 3 0 100-6 3 3 0 000 6z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <h3 class="text-lg font-bold">
              {{ t("contact.hqTitle") }}
            </h3>
          </div>

          <p class="mt-3 text-sm text-ink-600 dark:text-ink-200">
            {{ t("contact.hqBody") }}
          </p>

          <p class="mt-2 text-sm text-ink-400">
            {{ t("contact.hqNote") }}
          </p>
        </div>
      </BaseCard>
    </div>
  </section>
</template>
