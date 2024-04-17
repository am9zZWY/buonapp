<template>
  <div class="mx-auto" v-if="data !== null">
    <blockquote class="border-gray-400 rounded-xl p-4">
      <p class="italic font-serif">{{ data.quote }}</p>
      <footer class="text-gray-600 font-extralight text-xs">– {{ data.author }}</footer>
    </blockquote>
  </div>
</template>

<script setup lang="ts">
import type { Quote } from '~/types/quote'

const { data } = await useLazyFetch<Quote>('/api/quote')
</script>
