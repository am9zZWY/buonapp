<template>
  <div>
    <ClientOnly :placeholder="statusMessage">
      <template v-if="news">
        <NuxtLink to="/buone/notizie" class="hover:underline">
          {{ news }}
        </NuxtLink>
      </template>
      <template v-else>
        <DownloadProgress :progress="downloadProgress" />
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import useLTfNews from '~/composables/news/useLTfNews'

const ltfNews = await useLTfNews()
const news = computed(() => ltfNews.news.value)
const statusMessage = computed(() => ltfNews.statusMessage.value)
const downloadProgress = computed(() => ltfNews.downloadProgress.value)
</script>
