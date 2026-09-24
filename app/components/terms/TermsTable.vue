<script setup lang="ts">
import type { TermsTable } from "~/core/terms/TermsDocument";

interface Props {
  table: TermsTable;
}

const props = defineProps<Props>();
const { t } = useOwnI18n();

const headers = computed(() => props.table.headerKeys.map(key => t(key)));
const rows = computed(() =>
  props.table.rows.map(row => row.map(key => t(key)))
);
</script>

<template>
  <div
    class="overflow-x-auto rounded-xl border border-ink-900/10 dark:border-white/10"
  >
    <table class="w-full text-left text-sm">
      <thead class="bg-ink-50 dark:bg-white/5">
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="px-4 py-3 font-semibold text-ink-900 dark:text-white"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
          class="border-t border-ink-900/5 dark:border-white/5"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="px-4 py-3 align-top text-ink-500 dark:text-ink-300"
            :class="cellIndex === 0 ? 'font-semibold text-ink-700 dark:text-ink-100' : ''"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
