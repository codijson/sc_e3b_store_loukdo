<script setup lang="ts">
interface Props {
  titleKey: string;
  bodyKey: string;
  points: string[];
  ctaKey: string;
  iconPath: string;
  reverse?: boolean;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), { reverse: false });
const { t } = useOwnI18n();
</script>

<template>
  <BaseCard class="overflow-hidden">
    <div
      class="grid gap-10 md:grid-cols-2 md:items-center"
      :class="reverse ? 'md:[&>*:first-child]:order-2' : ''"
    >
      <div>
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary dark:bg-primary-dark dark:text-primary-medium"
        >
          <span v-html="icon"></span>
        </div>
        <h3 class="mt-5 text-2xl font-bold text-ink-900 dark:text-white">
          {{ t(titleKey) }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
          {{ t(bodyKey) }}
        </p>

        <ul class="mt-5 space-y-2.5">
          <li
            v-for="point in points"
            :key="point"
            class="flex items-center gap-2.5 text-sm font-medium text-ink-700 dark:text-ink-100"
          >
            <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5 shrink-0 text-primary">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.6" />
              <path
                d="M8.5 12.5l2.2 2.2 4.8-5"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ t(point) }}
          </li>
        </ul>

        <BaseButton to="/contact" class="mt-6"> {{ t(ctaKey) }} → </BaseButton>
      </div>

      <div class="flex items-center justify-center rounded-xl2 bg-transparent">
        <slot name="visual" />
      </div>
    </div>
  </BaseCard>
</template>
