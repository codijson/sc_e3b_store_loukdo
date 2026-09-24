<script setup lang="ts">
interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** When true, renders a skeleton placeholder instead of the real text. */
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  align: "center",
  eyebrow: undefined,
  subtitle: undefined,
  loading: false,
});
</script>

<template>
  <SkeletonBlock
    v-if="loading"
    :eyebrow="Boolean(eyebrow)"
    :subtitle="Boolean(subtitle)"
    :align="align"
    :cards="0"
  />
  <div
    v-else
    :class="
      align === 'center'
        ? 'mx-auto max-w-3xl text-center'
        : 'max-w-2xl text-left'
    "
  >
    <p
      v-if="eyebrow"
      class="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-500"
    >
      {{ eyebrow }}
    </p>
    <h2
      class="text-3xl font-extrabold leading-tight text-ink-900 dark:text-white md:text-4xl"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="mt-4 text-base text-ink-500 dark:text-ink-200 md:text-lg"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
