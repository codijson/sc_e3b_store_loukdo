<script setup lang="ts">
const { locale } = useOwnI18n();
useHead({
  htmlAttrs: { lang: locale },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
