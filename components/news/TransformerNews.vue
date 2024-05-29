<template>
  <ClientOnly placeholder="Loading ...">
    <template v-if="news">
      {{ news }}
    </template>
    <template v-else>
      Loading ...
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
const localTransformerNews = await useLocalTransformerNews()
const news = computed(() => localTransformerNews.aiNews.value)
</script>
