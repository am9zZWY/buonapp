<template>
  <div v-if="recipe">
    <h1>{{ recipe.name }}</h1>
  </div>
  <div v-else>
    <p>Recipe not found</p>
  </div>
</template>

<script lang="ts" setup>
import { useRecipeStore } from '~/stores/recipe'
import { recipeToMarkdown } from '~/types/recipe'

const recipeStore = useRecipeStore()

const props = withDefaults(defineProps<{
  id: string
}>(), {
  id: ''
})
const { id } = toRefs(props)

const { recipeMap } = storeToRefs(recipeStore)
const recipe = computed(() => {
  if (!id.value) {
    console.warn('No recipe ID provided')
    return null
  }

  if (!recipeMap.value) {
    console.warn('Recipe map not loaded')
    return null
  }

  return recipeMap.value[id.value]
})

const recipeMarkdown = computed(() => {
  if (!recipe.value) {
    return ''
  }

  return recipeToMarkdown(recipe.value)
})
</script>
