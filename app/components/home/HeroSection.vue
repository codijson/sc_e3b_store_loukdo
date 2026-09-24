<script setup lang="ts">
const { t } = useOwnI18n();

const channels = [
  {
    name: "Facebook",
    color: "#1877F2",
    path: "M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z",
  },
  {
    name: "Instagram",
    color: "#E1306C",
    path: "M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.4.4a5 5 0 012.9 2.9c.2.6.4 1.3.4 2.4.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.4 2.4a5 5 0 01-2.9 2.9c-.6.2-1.3.4-2.4.4-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.4-.4a5 5 0 01-2.9-2.9c-.2-.6-.4-1.3-.4-2.4C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.4-2.4a5 5 0 012.9-2.9c.6-.2 1.3-.4 2.4-.4C8.9 2 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z",
  },
  {
    name: "Telegram",
    color: "#26A5E4",
    path: "M22 4.5L2.6 12.1c-1 .4-1 1.6.1 1.9l4.7 1.5 1.8 5.7c.2.7 1.1.9 1.6.4l2.6-2.6 4.9 3.6c.7.5 1.7.1 1.9-.7L23.9 5.6c.2-.9-.7-1.6-1.9-1.1zM8.8 14.8L18 8.1c.2-.1.4.1.2.3l-7.6 6.9-.3 3.4-1.5-3.9z",
  },
  {
    name: "WhatsApp",
    color: "#25D366",
    path: "M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.1.2-.3.2-.6.1-.2-.1-1.1-.4-2-1.3-.7-.7-1.2-1.5-1.4-1.8-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 3 4.7 4.1.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3z",
  },
  {
    name: "TikTok",
    color: "#000000",
    path: "M16.6 5.8a4.3 4.3 0 01-3.8-4.3H9.4v14.7a2.6 2.6 0 11-2.6-2.6c.2 0 .5 0 .7.1V10.3a6.2 6.2 0 00-.7 0 6.2 6.2 0 106.2 6.2V9.6a7.7 7.7 0 004.4 1.4V7.6a4.3 4.3 0 01-2.8-1.8z",
  },
];
</script>

<template>
  <section class="relative overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(60%_60%_at_80%_0%,theme(colors.brand.500)_0%,transparent_60%)]"
    />

    <div
      class="shell relative grid gap-12 lg:grid-cols-2 lg:items-start pb-20 pt-20 md:pt-28 md:pb-28"
    >
      <div v-reveal="'left'">
        <span
          class="inline-flex items-center rounded-full bg-primary-light dark:bg-primary-dark px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-medium ring-1 ring-inset ring-white/15"
        >
          {{ t("home.eyebrow") }}
        </span>

        <div
          class="mt-6 font-display font-extrabold leading-[1.08] text-primary dark:text-primary-medium text-2xl sm:text-3xl lg:text-4xl"
        >
          {{ t("home.title") }}
        </div>

        <p class="mt-6 max-w-xl text-base leading-relaxed">
          {{ t("home.description") }}
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <BaseButton to="/contact" size="lg">
            {{ t("home.ctaPrimary") }}
          </BaseButton>
          <BaseButton
            to="/contact"
            variant="outline"
            size="lg"
            class="!text-primary !border-primary hover:!border-primary dark:!text-primary-medium dark:!border-primary-medium"
          >
            {{ t("home.ctaSecondary") }}
          </BaseButton>
        </div>
      </div>

      <div
        v-reveal="{ type: 'right', delay: 120 }"
        class="relative mx-auto w-full max-w-lg"
        role="img"
        :aria-label="t('home.heroImageAlt')"
      >
        <img src="~/assets/images/home-page/1.svg" alt="" />
      </div>
    </div>
  </section>
</template>
