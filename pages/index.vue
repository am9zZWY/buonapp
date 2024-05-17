<template>
  <div>
    <Section title="Buongiorno! 🌞">
      <template #before>
        <QuickLook />
      </template>

      <Subsection>
        <LazyQuote />
      </Subsection>

      <!-- <Subsection title="Notizie 📰" subtitle="News from around the world">
        <LazyRssNews />
      </Subsection> -->
    </Section>

    <Section title="Plan your day 📅🐑">
      <TodoContainer />
    </Section>

    <Section title="️Cosa cucinare oggi? 🍝" subtitle="What to cook today?">
      <ClientOnly>
        <ThumbnailLink
          alt="Cooking Image"
          description=""
          src="https://t4.ftcdn.net/jpg/03/32/75/39/240_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg"
          title="Search for new recipes"
          to="/buon/appetito"
        >
          <template #description>
            <p>Recipes and delicious dishes!</p>
          </template>
        </ThumbnailLink>
      </ClientOnly>
    </Section>
  </div>
</template>

<script setup lang="ts"></script>
