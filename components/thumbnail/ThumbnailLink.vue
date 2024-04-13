<template>
    <div class="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer">
        <div class="md:flex">
            <div class="md:shrink-0">
                <img class="h-48 w-full object-cover md:h-full md:w-48" :src="src" :alt="alt">
            </div>
            <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-green-800 font-semibold" v-if="eyebrow">{{ eyebrow }}</div>
                <NuxtLink :to="to" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                    {{ title }}
                </NuxtLink>
                <p class="mt-2 text-slate-500">
                    <slot name="description">
                        {{ description }}
                    </slot>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import './thumbnail-link.css'

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
