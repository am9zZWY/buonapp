<template>
  <NuxtLink :to="to" :disabled="!to">
    <div
      class="rounded-xl shadow-lg bg-white dark:bg-gray-800 p-4 hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 font-serif pb-2 hover:underline">
        {{ title }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400">{{ description }}</p>
      <p class="text-gray-600 font-extralight text-xs">
        {{ pubDate }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  description: String,
  title: String,
  to: String,
  pubDate: String
})
</script>
