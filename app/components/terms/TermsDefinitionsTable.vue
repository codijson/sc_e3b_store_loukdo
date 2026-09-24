<script setup lang="ts">
interface Props {
  items: string[];
}
const props = defineProps<Props>();
const { t } = useOwnI18n();

const rows = computed(() => {
  const pairs: { term: string; def: string }[] = [];
  for (let i = 0; i < props.items.length; i += 2) {
    const termKey = props.items[i];
    const defKey = props.items[i + 1];
    if (!termKey || !defKey) continue;
    pairs.push({ term: t(termKey), def: t(defKey) });
  }
  return pairs;
});
</script>

<template>
  <div
    class="overflow-x-auto rounded-xl border border-ink-900/10 dark:border-white/10"
  >
    <table class="w-full text-left text-sm">
      <thead class="bg-ink-50 dark:bg-white/5">
        <tr>
          <th class="px-4 py-3 font-semibold text-ink-900 dark:text-white">
            Term
          </th>
          <th class="px-4 py-3 font-semibold text-ink-900 dark:text-white">
            Meaning
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.term"
          class="border-t border-ink-900/5 dark:border-white/5"
        >
          <td class="px-4 py-3 font-semibold text-ink-700 dark:text-ink-100">
            {{ row.term }}
          </td>
          <td class="px-4 py-3 text-ink-500 dark:text-ink-300">
            {{ row.def }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
