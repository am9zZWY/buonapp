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

    <Section title="Plan your day 📅">
      <ClientOnly>
        <TodoContainer />
      </ClientOnly>
    </Section>
  </div>
</template>

<script setup lang="ts"></script>
