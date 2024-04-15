<template>
  <div v-if="recipe">
    <h2>{{ recipe.name }}</h2>
  </div>
  <div v-else>
    <h2 class="text-xl font-bold">Oh no!</h2>
    <p>We did not find the recipe you looked for.</p>
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
