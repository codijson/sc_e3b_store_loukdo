<script setup lang="ts">
const { primaryLinks, isActive } = useNavigation();
const { t } = useOwnI18n();
const route = useRoute();

const isMenuOpen = ref(false);
const isScrolled = ref(false);

function closeMenu() {
  isMenuOpen.value = false;
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function handleScroll() {
  isScrolled.value = window.scrollY > 8;
}

// Lock body scroll while the off-canvas drawer is open.
watch(isMenuOpen, open => {
  document.documentElement.classList.toggle("overflow-hidden", open);
});

// Close the drawer automatically on route change.
watch(
  () => route.fullPath,
  () => closeMenu()
);

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.documentElement.classList.remove("overflow-hidden");
});
</script>

<template>
  <!--
    Fixed at every breakpoint so the header never scrolls out of view —
    on small/responsive screens this also anchors the off-canvas drawer
    below. A spacer in the default layout keeps page content clear of it.
  -->
  <header
    class="fixed inset-x-0 top-0 z-50 border-b text-white transition-all duration-300 py-1.5"
    :class="
      isScrolled || isMenuOpen
        ? 'border-white/10 bg-primary shadow-soft-dark backdrop-blur-md'
        : 'border-transparent bg-primary backdrop-blur-sm'
    "
  >
    <div class="shell flex h-16 items-center justify-between">
      <NuxtLink
        to="/"
        class="font-display text-xl font-extrabold tracking-tight transition-opacity hover:opacity-90"
      >
        <img src="~/assets/icons/e3byte-landing-logo.svg" alt="" />
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="link in primaryLinks"
          :key="link.key"
          :to="link.to"
          class="relative pb-1 text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
          :class="
            isActive(link.to)
              ? 'text-white after:absolute after:inset-x-0 after:-bottom-[1px] after:h-0.5 after:rounded-full after:bg-white after:content-[\'\']'
              : ''
          "
        >
          {{ t(link.labelKey) }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-3 md:flex">
        <LocaleSwitcher />
        <ThemeToggle />
        <BaseButton
          to="/contact"
          variant="primary"
          class="!bg-white !text-brand-700 hover:!bg-brand-50"
        >
          {{ t("nav.getStarted") }}
        </BaseButton>
      </div>

      <button
        type="button"
        class="relative flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
        :aria-label="isMenuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')"
        aria-haspopup="true"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          class="h-6 w-6"
        >
          <path
            class="origin-center transition-all duration-200"
            :class="isMenuOpen ? 'opacity-0' : 'opacity-100'"
            d="M4 7h16M4 12h16M4 17h16"
            stroke-linecap="round"
          />
          <path
            class="origin-center transition-all duration-200"
            :class="isMenuOpen ? 'opacity-100' : 'opacity-0'"
            d="M6 6l12 12M18 6L6 18"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  </header>

  <!--
    Off-canvas mobile navigation: teleported to <body> so it's never
    clipped by an ancestor, slides in from the left, and spans the full
    viewport height regardless of page content length.
  -->
  <Teleport to="body">
    <transition name="drawer-fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-40 bg-ink-900/60 backdrop-blur-sm md:hidden"
        @click="closeMenu"
      />
    </transition>

    <transition name="drawer-slide">
      <nav
        v-if="isMenuOpen"
        :aria-label="t('a11y.mobileNav')"
        class="fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-[82vw] max-w-xs flex-col overflow-y-auto bg-brand-900 pb-8 pt-20 shadow-soft-dark md:hidden"
      >
        <div class="flex flex-1 flex-col gap-1 px-5 pt-10">
          <NuxtLink
            v-for="(link, index) in primaryLinks"
            :key="link.key"
            v-reveal="{ type: 'left', delay: index * 60 }"
            :to="link.to"
            class="rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
            :class="isActive(link.to) ? 'bg-white/10 text-white' : ''"
            @click="closeMenu"
          >
            {{ t(link.labelKey) }}
          </NuxtLink>

          <div class="mt-4 flex items-center justify-between gap-3 px-3">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>

          <BaseButton
            to="/contact"
            class="mt-4 w-full !bg-white !text-brand-700"
            @click="closeMenu"
          >
            {{ t("nav.getStarted") }}
          </BaseButton>
        </div>
      </nav>
    </transition>
  </Teleport>
</template>
