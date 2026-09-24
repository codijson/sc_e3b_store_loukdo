<script setup lang="ts">
interface Props {
  to?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
  type?: "button" | "submit";
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  variant: "primary",
  size: "md",
  type: "button",
});

const tag = computed(() => (props.to ? resolveComponent("NuxtLink") : "button"));

const sizeClasses = computed(() =>
  props.size === "lg" ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm"
);

const variantClasses = computed(() => {
  switch (props.variant) {
    case "outline":
      return "border border-ink-300/60 text-ink-900 hover:border-primary hover:text-primary dark:border-ink-100/20 dark:text-ink-50 dark:hover:border-primary-medium dark:hover:text-primary-medium";
    case "ghost":
      return "text-ink-700 hover:bg-ink-900/5 dark:text-ink-100 dark:hover:bg-white/5";
    default:
      return "bg-primary text-white hover:bg-primary-medium shadow-soft dark:bg-primary-medium dark:text-ink-900 dark:hover:bg-primary-light";
  }
});
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :type="!to ? type : undefined"
    class="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none"
    :class="[sizeClasses, variantClasses]"
  >
    <slot />
  </component>
</template>
