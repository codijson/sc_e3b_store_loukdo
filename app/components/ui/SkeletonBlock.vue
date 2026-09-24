<script setup lang="ts">
/**
 * SkeletonBlock
 * -------------
 * Composed placeholder for a whole page/section: optional eyebrow +
 * heading + subtitle, then an optional grid of skeleton cards. Configurable
 * via props so one component covers the hero/heading/card-grid shape used
 * by nearly every page and section in this app, instead of hand-rolling a
 * bespoke skeleton per component.
 */
interface Props {
  eyebrow?: boolean;
  /** Heading width, as a Tailwind arbitrary-friendly CSS value. */
  headingWidth?: string;
  subtitle?: boolean;
  subtitleLines?: number;
  align?: "left" | "center";
  /** Number of skeleton cards to render below the heading. 0 disables the grid. */
  cards?: number;
  columns?: 1 | 2 | 3 | 4;
}

const props = withDefaults(defineProps<Props>(), {
  eyebrow: false,
  headingWidth: "20rem",
  subtitle: true,
  subtitleLines: 2,
  align: "center",
  cards: 0,
  columns: 3,
});

const columnsClass: Record<NonNullable<Props["columns"]>, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto text-center' : 'text-left'">
    <Skeleton
      v-if="eyebrow"
      width="8rem"
      height="0.75rem"
      rounded="full"
      :class="align === 'center' ? 'mx-auto' : ''"
    />
    <Skeleton
      :width="headingWidth"
      height="2rem"
      rounded="lg"
      :class="['mt-3 max-w-full', align === 'center' ? 'mx-auto' : '']"
    />
    <div
      v-if="subtitle"
      class="mt-5 space-y-2"
      :class="align === 'center' ? 'mx-auto max-w-xl' : 'max-w-xl'"
    >
      <Skeleton
        v-for="line in subtitleLines"
        :key="line"
        height="0.85rem"
        :width="line === subtitleLines ? '60%' : '100%'"
        :class="align === 'center' ? 'mx-auto' : ''"
      />
    </div>

    <div v-if="cards > 0" class="mt-10 grid gap-6" :class="columnsClass[props.columns]">
      <div
        v-for="card in cards"
        :key="card"
        class="rounded-xl2 border border-ink-900/10 p-6 text-left dark:border-white/10"
      >
        <Skeleton circle height="2.75rem" rounded="full" />
        <Skeleton width="70%" height="1.1rem" rounded="md" class="mt-5" />
        <div class="mt-3 space-y-2">
          <Skeleton height="0.8rem" />
          <Skeleton width="80%" height="0.8rem" />
        </div>
      </div>
    </div>
  </div>
</template>
