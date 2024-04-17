<template>
  <!-- Add recipes -->
  <Section title="Ricetta del giorno" subtitle="Today we recommend" no-shadow>
    <template #full-width>
      <ThumbnailHero :title="recipes?.[0]?.name" subtitle="La ricetta più semplice e veloce" :description="recipes?.[0]?.instructions" :to="'/buon/appetito/' + recipes?.[0]?.id" :src="recipes?.[0]?.images" />
    </template>
  </Section>

  <Section title="Cosa cucinare oggi? 🍝" subtitle="What to cook today?">
    <ThumbnailLink v-for="recipe in recipes" :key="recipe.id" :title="recipe.name" :description="recipe.text"
                   :eyebrow="recipe.instructions.split('\n').length + ' steps'" :to="'/buon/appetito/' + recipe.id">
    </ThumbnailLink>
  </Section>

  <!-- TODO: Allow to add new recipes -->
  <Button label="Add your own recipe" to="/buon/appetito/aggiungi-ricetta" />
</template>

<script lang="ts" setup>
import { useRecipeStore } from '~/stores/recipe'
import ThumbnailHero from '~/components/thumbnail/ThumbnailHero.vue'

const recipeStore = useRecipeStore()
const { recipes } = storeToRefs(recipeStore)
</script>
