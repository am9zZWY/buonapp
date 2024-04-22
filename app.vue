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
useSeoMeta({
  title: 'Buonapp - Your daily companion ☀️',
  description: 'Discover buonapp: Your ultimate all-in-one tool for seamless daily management. With features like calendar, todos, recipes, weather, and news, buonapp streamlines your day with simplicity and convenience. Say hello to effortless organization and productivity!',
  author: 'Josef Müller 🚀',
  robots: 'index, follow',
  ogTitle: 'Buonapp - Your daily companion ☀️',
  ogDescription: 'Discover buonapp: Your ultimate all-in-one tool for seamless daily management. With features like calendar, todos, recipes, weather, and news, buonapp streamlines your day with simplicity and convenience. Say hello to effortless organization and productivity!',
  ogUrl: 'https://buonapp.vercel.app/buonapp',
  ogImage: 'https://buonapp.vercel.app/logo.png',
  twitterTitle: 'Buonapp - Your daily companion ☀️',
  twitterDescription: 'Discover buonapp: Your ultimate all-in-one tool for seamless daily management. With features like calendar, todos, recipes, weather, and news, buonapp streamlines your day with simplicity and convenience. Say hello to effortless organization and productivity!',
  twitterImage: 'https://example.com/buonapp.jpg'
})


</script>
