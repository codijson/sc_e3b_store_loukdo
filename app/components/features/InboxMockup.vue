<template>
  <img src="~/assets/images/feature-page/1.svg" alt="" class="rounded-xl" />

  <div
    v-if="false"
    class="w-full max-w-sm rounded-xl border border-ink-900/10 bg-white p-4 shadow-soft transition-transform duration-500 hover:-translate-y-1 dark:border-white/10 dark:bg-ink-800"
  >
    <div
      class="flex items-center justify-between border-b border-ink-900/5 pb-3 dark:border-white/5"
    >
      <span class="text-xs font-bold text-ink-400">Inbox</span>
      <span class="h-2 w-2 rounded-full bg-emerald-400" />
    </div>
    <ul class="mt-3 space-y-2">
      <li
        v-for="i in 4"
        :key="i"
        class="flex items-center gap-2.5 rounded-lg p-2"
        :class="i === 1 ? 'bg-primary-light dark:bg-primary-dark' : ''"
      >
        <span
          class="h-7 w-7 shrink-0 rounded-full"
          :class="i === 1 ? 'bg-primary' : 'bg-ink-100 dark:bg-white/10'"
        />
        <span class="flex-1 space-y-1">
          <span class="block h-2 w-20 rounded bg-ink-200 dark:bg-white/15" />
          <span class="block h-1.5 w-14 rounded bg-ink-100 dark:bg-white/10" />
        </span>
      </li>
    </ul>
  </div>
</template>
