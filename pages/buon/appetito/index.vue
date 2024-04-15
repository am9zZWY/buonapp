<template>
  <!-- Add recipes -->
  <ThumbnailLinkContainer title="Ricetta del giorno" subtitle="Oggi ti consigliamo...">
    <template #full-width>
      <ThumbnailHero :title="recipes?.[0]?.name" subtitle="La ricetta più semplice e veloce" :description="recipes?.[0]?.instructions" to="'/buon/appetito/oftheday" :src="recipes?.[0]?.image" />
    </template>
  </ThumbnailLinkContainer>

  <ThumbnailLinkContainer title="Cosa cucinare oggi? 🍝">
    <ThumbnailLink v-for="recipe in recipes" :key="recipe.id" :title="recipe.name" :description="recipe.text"
                   :eyebrow="recipe.instructions.length + ' steps'" :to="'/buon/appetito/' + recipe.id">
    </ThumbnailLink>
  </ThumbnailLinkContainer>

  <!-- TODO: Allow to add new recipes -->
  <Button label="Add your own recipe" to="/buon/appetito/aggiungi-ricetta" />
</template>

<script lang="ts" setup>
import { useRecipeStore } from '~/stores/recipe'
import ThumbnailHero from '~/components/thumbnail/ThumbnailHero.vue'

const recipeStore = useRecipeStore()
const { recipes } = storeToRefs(recipeStore)
</script>
