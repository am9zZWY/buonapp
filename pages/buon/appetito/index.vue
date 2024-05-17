<template>
  <!-- Add recipes -->
  <Section title="Ricetta del giorno" subtitle="Today we recommend">
    <template #full-width>
      <ThumbnailHero
        :title="recipeOfTheDay?.name" subtitle="La ricetta più semplice e veloce"
        :description="recipeOfTheDay?.instructions" :to="`/buon/appetito/${recipeOfTheDay?.id}`"
        :src="recipeOfTheDay?.images" />
    </template>
  </Section>

  <Section title="Cosa cucinare oggi? 🍝" subtitle="What to cook today?">
    <ThumbnailLink
      v-for="recipe in recipeList" :key="recipe.id" :title="recipe.name" :description="recipe.text"
      :eyebrow="recipe.instructions.split('\n').length + ' steps'" :to="`/buon/appetito/${recipe.id}`"
      :src="recipe.images?.split(',')[0]" />
  </Section>

  <Section title="Personalizza la tua esperienza" subtitle="Customize your experience">
    <Button label="Add your own recipe" to="/buon/appetito/add" />
  </Section>
</template>

<script lang="ts" setup>
import { useRecipeStore } from '~/stores/recipe'
import ThumbnailHero from '~/components/thumbnail/ThumbnailHero.vue'

const recipeStore = useRecipeStore()
const recipeList = computed(() => recipeStore.recipeList)
const recipeOfTheDay = computed(() => recipeStore.recipeOfTheDay)
</script>
