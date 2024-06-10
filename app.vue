<template>
  <div class="mx-5">
    <NuxtPwaAssets />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const title = 'Buonapp - Your daily companion ☀️'
const description = 'Discover buonapp: Your ultimate all-in-one tool for seamless daily management. With features like calendar, todos, recipes, weather, and news, buonapp streamlines your day with simplicity and convenience. Say hello to effortless organization and productivity!'

useSeoMeta({
  title: title,
  description: description,
  author: 'Josef Müller 🚀',
  robots: 'index, follow',
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://buonapp.vercel.app/buonapp',
  ogImage: 'https://buonapp.vercel.app/logo.png',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: 'https://buonapp.vercel.app/banner.png'
})

// Verify the user's session
useSessionStore()
</script>
