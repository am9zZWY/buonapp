<template>
  <div class="flex items-center gap-x-3 text-xs">
    <p>
      <span class="text-gray-600 dark:text-gray-400">
        <Weather compact />
      </span>
      <span class="font-extralight text-gray-300 dark:text-gray-500">Weather</span>
    </p>
    <div class="mx-2 h-8 bg-gray-300 dark:bg-neutral-600 w-px" />
    <p>
      <span class="text-gray-600 dark:text-gray-400">
        <ClientOnly>
            <LazyTransformerNews />
          <!-- <AiNews :max-news="2" subjects="politics, technology, climate" /> -->
        </ClientOnly>
      </span>
      <span class="font-extralight text-gray-300 dark:text-gray-500">AI News</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
</script>
