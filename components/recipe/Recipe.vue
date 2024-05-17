<template>
  <ClientOnly>
    <section v-if="recipe">
      <div class="shadow-lg rounded-lg overflow-hidden mb-5">
        <div class="w-full flex flex-col md:flex-row justify-between items-start px-6 py-4">
          <div class="w-full md:w-1/2">
            <h2 class="text-xl font-semibold font-serif text-gray-800 dark:text-gray-200">{{ recipe.name }}</h2>

            <!-- Cooking time -->
            <div class="flex justify-between mt-2">
              <div class="flex items-center gap-x-3 text-xs">
                <p>
                  <span class="text-gray-600 dark:text-gray-400">{{ recipe.prepTime }}</span>
                  <br>
                  <span class="font-extralight text-gray-300 dark:text-gray-500">Prep</span>
                </p>
                <div class="mx-2 h-8 bg-gray-300 dark:bg-gray-600 w-px"/>
                <p>
                  <span class="text-gray-600 dark:text-gray-400">{{ recipe.cookTime }}</span>
                  <br>
                  <span class="font-extralight text-gray-300 dark:text-gray-500">Cook</span>
                </p>
                <div class="mx-2 h-8 bg-gray-300 dark:bg-gray-600 w-px"/>
                <p>
                  <span class="text-gray-600 dark:text-gray-400">{{ recipe.totalTime }}</span>
                  <br>
                  <span class="font-extralight text-gray-300 dark:text-gray-500">Total</span>
                </p>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-800 dark:text-slate-400 mt-4">{{ recipe.text }}</p>
          </div>

          <!-- Image -->
          <div v-if="recipe?.images?.[0]" class="w-full md:w-1/2 mt-4">
            <img :alt="recipe.name" :src="recipe?.images?.[0]" class="w-2/3 object-cover rounded-xl overflow-hidden" >
          </div>
        </div>
      </div>


      <div class="flex flex-col md:flex-row justify-between items-start">
        <div class="w-full md:w-1/2 shadow-lg rounded-lg overflow-hidden md:mr-2 mb-4 md:mb-0">
          <div class="px-6 py-4">
            <h3 class="text-lg font-light font-serif text-gray-800 dark:text-gray-200 mb-3">Ingredients</h3>
            <ul class="text-gray-800 dark:text-slate-400">
              <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                {{ ingredient }}
              </li>
            </ul>
          </div>
        </div>

        <div class="w-full md:w-1/2 shadow-lg rounded-lg overflow-hidden md:ml-2">
          <div class="px-6 py-4">
            <h3 class="text-lg font-light font-serif text-gray-800 dark:text-gray-200 mb-3">Instructions</h3>
            <ol class="text-gray-800 dark:text-slate-400">
              <li v-for="(step, index) in recipe.instructions" :key="index" class="flex items-start mb-4">
                <span class="mr-2 font-semibold">{{ index + 1 }}.</span>
                <div>
                  <p class="mb-1">{{ step.text }}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-4">
        <Button :to="`/buon/appetito/${recipe.id}/edit`" label="Edit recipe" />
      </div>

    </section>
    <div v-else>
      <h2 class="text-xl font-bold">Oh no!</h2>
      <p>We did not find the recipe you looked for.</p>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useRecipeStore } from '~/stores/recipe'
import { prepareRecipe, type Recipe } from '~/types/melaRecipe'

const recipeStore = useRecipeStore()

interface RecipeProps {
  id: string
}

const props = withDefaults(defineProps<RecipeProps>(), {
  id: ''
})
const { id } = toRefs(props)

const { recipeMap } = storeToRefs(recipeStore)
const recipe = computed<Recipe | null>(() => {
  if (!id.value) {
    console.warn('No recipe ID provided')
    return null
  }

  if (!recipeMap.value) {
    console.warn('Recipe map not loaded')
    return null
  }

  return prepareRecipe(recipeMap.value[id.value])
})
</script>
