<script setup lang="ts">
interface Props {
  padded?: boolean;
  /** When true, renders a Tailwind skeleton placeholder instead of the slot content. */
  loading?: boolean;
}
withDefaults(defineProps<Props>(), { padded: true, loading: false });
</script>

<template>
  <div
    class="card transition-transform duration-300 hover:-translate-y-1"
    :class="padded ? 'p-6 md:p-8' : ''"
  >
    <div v-if="loading" class="space-y-3" aria-hidden="true">
      <Skeleton circle height="2.5rem" />
      <Skeleton width="65%" height="1.1rem" rounded="md" class="mt-4" />
      <Skeleton height="0.8rem" />
      <Skeleton width="80%" height="0.8rem" />
    </div>
    <slot v-else />
  </div>
</template>
