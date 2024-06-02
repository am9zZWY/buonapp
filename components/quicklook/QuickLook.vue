<template>
  <div class="flex items-center gap-x-3 text-xs">
    <div
class="bg-white-50 dark:bg-white-700 p-3 rounded-xl shadow-md dark:shadow-lg cursor-pointer"
         @click="editWeather = true">
      <span class="text-gray-600 dark:text-gray-400">
        <Weather v-model:edit="editWeather" compact />
      </span>
      <span class="font-extralight text-gray-300 dark:text-gray-500">Weather</span>
    </div>
    <div class="mx-2 h-8 bg-gray-300 dark:bg-white-600 w-px" />
    <div class="bg-white-50 dark:bg-white-700 p-3 rounded-xl shadow-md dark:shadow-lg">
      <span class="text-gray-600 dark:text-gray-400">
        <ClientOnly>
            <LazyTransformerNews />
          <!-- <AiNews :max-news="2" subjects="politics, technology, climate" /> -->
        </ClientOnly>
      </span>
      <span class="font-extralight text-gray-300 dark:text-gray-500">AI News</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const editWeather = useState('editMode', () => false)
</script>
