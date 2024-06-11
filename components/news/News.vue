<template>
  <NuxtLink :disabled="!to" :to="to">
    <div
      class="rounded-xl shadow-lg bg-white dark:bg-neutral-900 p-4 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer"
    >
      <h2
        class="text-xl font-semibold text-gray-800 dark:text-gray-100 font-serif pb-2 hover:underline"
      >
        {{ title }}
      </h2>
      <p v-if="description" class="text-gray-600 dark:text-gray-400">{{ description }}</p>
      <p class="text-gray-600 font-extralight text-xs">
        {{ pubDate }}
      </p>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
interface NewsProps {
  description?: string
  title: string
  to: string
  pubDate: string
}

withDefaults(defineProps<NewsProps>(), {
  description: undefined,
  title: 'News title',
  to: '/',
  pubDate: ''
})
</script>
