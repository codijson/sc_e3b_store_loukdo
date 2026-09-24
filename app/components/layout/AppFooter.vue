<script setup lang="ts">
const { footerGroups } = useNavigation();
const { t } = useOwnI18n();

const socials = [
  {
    key: "facebook",
    href: "https://facebook.com",
    path: "M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z",
  },
  {
    key: "twitter",
    href: "https://twitter.com",
    path: "M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.6 11.6 0 013 4.8a4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 01-1.9.1 4.1 4.1 0 003.8 2.8A8.2 8.2 0 012 18.4a11.6 11.6 0 006.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z",
  },
  {
    key: "instagram",
    href: "https://instagram.com",
    path: "M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.4.4a5 5 0 012.9 2.9c.2.6.4 1.3.4 2.4.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.4 2.4a5 5 0 01-2.9 2.9c-.6.2-1.3.4-2.4.4-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.4-.4a5 5 0 01-2.9-2.9c-.2-.6-.4-1.3-.4-2.4C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.4-2.4a5 5 0 012.9-2.9c.6-.2 1.3-.4 2.4-.4C8.9 2 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z",
  },
  {
    key: "linkedin",
    href: "https://linkedin.com",
    path: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9z",
  },
  {
    key: "youtube",
    href: "https://youtube.com",
    path: "M23 12s0-3.2-.4-4.7a3 3 0 00-2.1-2.1C18.9 4.7 12 4.7 12 4.7s-6.9 0-8.5.5A3 3 0 001.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a3 3 0 002.1 2.1c1.6.5 8.5.5 8.5.5s6.9 0 8.5-.5a3 3 0 002.1-2.1c.4-1.5.4-4.7.4-4.7zM9.8 15.5v-7l6 3.5-6 3.5z",
  },
];

const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-white/10 bg-black text-ink-100">
    <div v-reveal="'up'" class="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div>
        <p class="font-display text-2xl font-extrabold text-white">
          <img src="~/assets/icons/e3byte-landing-logo.svg" alt="" />
        </p>
        <p class="mt-3 max-w-xs text-sm leading-relaxed text-ink-300">
          {{ t("footer.tagline") }}
        </p>
      </div>

      <div v-for="group in footerGroups" :key="group.titleKey">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-300">
          {{ t(group.titleKey) }}
        </p>
        <ul class="mt-4 space-y-3">
          <li v-for="link in group.links" :key="link.key">
            <NuxtLink :to="link.to" class="text-sm text-ink-200 transition-colors hover:text-white">
              {{ t(link.labelKey) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <p
          class="text-xs font-bold uppercase tracking-widest text-brand-300 underline decoration-brand-400 decoration-2 underline-offset-8"
        >
          {{ t("footer.followUs") }}
        </p>
        <div class="mt-5 flex gap-2.5">
          <a
            v-for="social in socials"
            :key="social.key"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-500"
            :aria-label="social.key"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
              <path :d="social.path" />
            </svg>
          </a>
        </div>
        <p class="mt-6 text-xs text-ink-400">
          {{ t("footer.copyright", { year }) }}
        </p>
      </div>
    </div>
  </footer>
</template>
