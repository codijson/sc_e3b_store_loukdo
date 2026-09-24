/**
 * useSkeleton
 * -----------
 * Reactive `isLoading` flag for gating a Tailwind skeleton placeholder vs
 * real content. Flips to `false` after mount once a minimum display
 * duration has elapsed, so:
 *  - on the server, content renders immediately (no flash for SEO/no-JS),
 *  - on the client, the skeleton is guaranteed to be visible for at least
 *    `minDurationMs`, avoiding an imperceptible/jarring flicker,
 *  - it stays framework-idiomatic (Vue refs), so every consumer just does
 *    `v-if="isLoading"` / `v-else` — no bespoke booleans per component.
 *
 * Usage:
 *   const { isLoading } = useSkeleton();
 *   <SkeletonBlock v-if="isLoading" cards="3" />
 *   <template v-else> ...real content... </template>
 *
 * `isLoading` always starts `true` (on both server and client) so the
 * server-rendered markup and the pre-mount client render match exactly —
 * starting them differently would trigger a hydration mismatch. The swap
 * to real content only ever happens client-side, after mount.
 */
export function useSkeleton(minDurationMs = 350) {
  const isLoading = ref(true);

  onMounted(() => {
    const timer = setTimeout(() => {
      isLoading.value = false;
    }, minDurationMs);
    onUnmounted(() => clearTimeout(timer));
  });

  return { isLoading: readonly(isLoading) };
}
