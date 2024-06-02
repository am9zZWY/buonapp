<template>
  <NuxtLink :disabled="!to" :to="to">
    <div
      class="max-w-md md:max-w-1xl rounded-xl shadow-md overflow-hidden hover:shadow-xl bg-white dark:bg-white-900 transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer">
      <div class="md:flex">
        <div class="md:shrink-0">
          <img :alt="alt" :src="src" class="h-48 w-full object-cover md:h-full md:w-48" >
        </div>
        <div class="p-8">
          <div v-if="eyebrow" class="uppercase tracking-wide text-sm text-green-800 dark:text-white font-semibold">
            {{ eyebrow }}
          </div>
          <h2 class="block mt-1 text-lg leading-tight font-medium hover:underline">
            {{ title }}
          </h2>
          <p class="mt-2 text-slate-400 dark:text-slate-300">
            <slot name="description">
              {{ description }}
            </slot>
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
interface HeaderProps {
  /**
   * The source of the image
   */
  src: string,
  /**
   * The alt text of the image
   */
  alt: string,
  /**
   * The link to navigate to
   */
  to: string,
  /**
   * The eyebrow text
   */
  eyebrow?: string,
  /**
   * The title text
   */
  title: string,
  /**
   * The description text
   */
  description: string
}

withDefaults(defineProps<HeaderProps>(), {
  src: 'https://picsum.photos/512',
  alt: 'Thumbnail Image',
  to: '/',
  title: 'Title',
  description: ''
})
</script>
