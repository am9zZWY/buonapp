<template>
  <Section title="Buongiorno! 🌞">
    <template #before>
      <QuickLook />
    </template>

    <Subsection>
      <Quote />
    </Subsection>

    <Subsection title="Notizie 📰" subtitle="News from around the world">
      <RssNews />
    </Subsection>
  </Section>

  <Section title="️Cosa cucinare oggi? 🍝" subtitle="What to cook today?">
    <!-- <ThumbnailLink alt="Cooking Image" description="Scopri nuove ricette e prepara piatti deliziosi!"
                   eyebrow="Appetito"
                   src="https://t4.ftcdn.net/jpg/03/32/75/39/240_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg"
                   title="Recipe of the day"
                   to="/buon/appetito/oftheday">
      <template #description>
        <p>Today's menu: pasta, pizza, and more!</p>
      </template>
    </ThumbnailLink> -->

    <ClientOnly>
      <ThumbnailLink alt="Cooking Image" description=""
                     src="https://t4.ftcdn.net/jpg/03/32/75/39/240_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg"
                     title="Search for new recipes"
                     to="/buon/appetito">
        <template #description>
          <p>Recipes and delicious dishes!</p>
        </template>
      </ThumbnailLink>
    </ClientOnly>
  </Section>
</template>
<script setup lang="ts"></script>
