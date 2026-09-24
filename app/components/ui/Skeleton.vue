<script setup lang="ts">
/**
 * Skeleton
 * --------
 * Single-purpose Tailwind loading placeholder. Every other skeleton piece
 * (`SkeletonBlock`, `BaseCard`'s `loading` state, etc.) is built from this
 * primitive so the pulse animation, colours and dark-mode handling only
 * live in one place.
 */
interface Props {
  /** Element/tag to render — keep it a plain block-level element. */
  as?: string;
  width?: string;
  height?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  /** Renders as an equal-sided circle (avatars, icon slots). */
  circle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
  width: "100%",
  height: "0.85rem",
  rounded: "md",
  circle: false,
});

const roundedClass: Record<NonNullable<Props["rounded"]>, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};
</script>

<template>
  <component
    :is="props.as"
    class="animate-pulse bg-ink-900/10 dark:bg-white/10"
    :class="props.circle ? 'rounded-full' : roundedClass[props.rounded]"
    :style="{ width: props.circle ? props.height : props.width, height: props.height }"
    aria-hidden="true"
  />
</template>
