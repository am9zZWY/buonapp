<template>
  <NuxtLink :disabled="!to" :to="to">
    <div
      class="max-w-full flex flex-col-reverse md:flex-row justify-start gap-x-20 gap-y-5 transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer">
      <div>
        <img
:src="src" alt="Thumbnail"
             class="object-cover rounded-xl shadow-md overflow-hidden hover:shadow-xl" >
      </div>
      <div>
        <h2 class="text-4xl font-medium font-serif hover:underline">{{ title }}</h2>
        <h3 class="text-xl font-normal font-serif text-slate-400 dark:text-slate-300">{{ subtitle }}</h3>
        <p class="text-lg font-normal font-sans text-slate-400 dark:text-slate-300 mt-5">{{ description }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
type ThumbnailHeroProps = {
  title: string
  subtitle: string,
  description: string,
  src: string,
  to?: string,
}

withDefaults(
  defineProps<ThumbnailHeroProps>(),
  {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis nec elit ultricies.',
    src: 'https://picsum.photos/1024'
  }
)

</script>
