<template>
  <!-- Add recipes -->
  <ThumbnailLinkContainer title="Ricetta del giorno" subtitle="Le migliori ricette per te">
    <!-- TODO: Add recipe of the day -->
  </ThumbnailLinkContainer>

  <ThumbnailLinkContainer title="Cosa cucinare oggi? 🍝">
    <ThumbnailLink v-for="recipe in recipes" :key="recipe.id" :title="recipe.name" :description="recipe.description"
                   :eyebrow="recipe.steps.length + ' steps'" :to="'/buon/appetito/' + recipe.id">
    </ThumbnailLink>
  </ThumbnailLinkContainer>

  <!-- TODO: Allow to add new recipes -->
  <Button label="Add your own recipe" to="/buon/appetito/aggiungi-ricetta" />
</template>

<script lang="ts" setup>
import { useRecipeStore } from '~/stores/recipe'

const recipeStore = useRecipeStore()

const { recipes } = storeToRefs(recipeStore)
</script>
