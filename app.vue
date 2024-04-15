<template>
  <div class="mx-5">
    <NuxtPwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Buonapp - Your Ultimate Food Delivery Solution',
  description: 'Discover the convenience of Buonapp, the premier food delivery app connecting you with the finest restaurants in your area. Savor the flavors of your favorite cuisines, delivered right to your doorstep!',
  themeColor: '#ff7f00',
  ogTitle: 'Buonapp - Your Ultimate Food Delivery Solution',
  ogDescription: 'Buonapp is your go-to food delivery app, offering a seamless experience to order from a variety of restaurants in your area. Explore the culinary delights of your neighborhood with Buonapp!',
  ogImage: 'https://example.com/buonapp-logo.png',
  ogUrl: 'https://buonapp.com',
  twitterTitle: 'Buonapp - Your Ultimate Food Delivery Solution',
  twitterDescription: 'Buonapp connects you with the best restaurants in your area for convenient food delivery. Enjoy delicious meals from the comfort of your home!',
  twitterImage: 'https://example.com/buonapp-twitter-card.png',
  twitterCard: 'summary_large_image',
})

</script>
