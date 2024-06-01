<template>
  <div>
    <ClientOnly :placeholder="statusMessage">
      <template v-if="news">
        <NuxtLink to="/buone/notizie" class="hover:underline">
          {{ news }}
        </NuxtLink>
      </template>
      <template v-else>
        <span>{{ statusMessage }}</span>

        <div v-if="totalDownload !== currTotalDownload" class="w-48 my-1 p-0">
          <UProgress :value="currTotalDownload" :max="totalDownload" size="sm" />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import useLTfNews from '~/composables/news/useLTfNews'

const ltfNews = await useLTfNews()
const news = computed(() => ltfNews.news.value)
const statusMessage = computed(() => ltfNews.statusMessage.value)
const currTotalDownload = computed(() => ltfNews.currTotalDownload.value)
const totalDownload = computed(() => ltfNews.totalDownload.value)
</script>
