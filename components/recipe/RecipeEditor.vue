<template>
  <ClientOnly>
    <Section subtitle="Share your favorite recipe with the community" title="Add your own recipe">
      <DevOnly>{{ recipe }}</DevOnly>

      <form class="w-full" @submit.prevent="handleForm">
        <div class="shadow-lg rounded-xl overflow-hidden mb-5">
          <div class="flex flex-col md:flex-row justify-between items-start px-6 py-4">
            <div class="w-full md:w-1/2">
              <h2 class="text-xl font-semibold font-serif text-gray-800 dark:text-gray-200">
                <input
                  v-model="recipe.name"
                  class="w-full text-xl font-semibold font-serif text-gray-800 dark:text-gray-200"
                  placeholder="Recipe name"
                >
              </h2>

              <!-- Cooking time -->
              <div class="flex justify-between mt-2">
                <div class="flex items-center gap-x-3 text-xs">
                  <p>
                    <span class="text-gray-600 dark:text-gray-400">
                      <input
                        v-model="recipe.prepTime"
                        class="w-16 text-gray-600 dark:text-gray-400"
                        placeholder="Prep time"
                      >
                    </span>
                    <br>
                    <span class="font-extralight text-gray-300 dark:text-gray-500">Prep</span>
                  </p>
                  <div class="mx-2 h-8 bg-gray-300 dark:bg-white-600 w-px" />
                  <p>
                    <span class="text-gray-600 dark:text-gray-400">
                      <input
                        v-model="recipe.cookTime"
                        class="w-16 text-gray-600 dark:text-gray-400"
                        placeholder="Cook time"
                      >
                    </span>
                    <br>
                    <span class="font-extralight text-gray-300 dark:text-gray-500">Cook</span>
                  </p>
                  <div class="mx-2 h-8 bg-gray-300 dark:bg-white-600 w-px" />
                  <p>
                    <span class="text-gray-600 dark:text-gray-400">
                      <input
                        v-model="recipe.totalTime"
                        class="w-16 text-gray-600 dark:text-gray-400"
                        placeholder="Total time"
                      >
                    </span>
                    <br>
                    <span class="font-extralight text-gray-300 dark:text-gray-500">Total</span>
                  </p>
                </div>
              </div>

              <!-- Description -->
              <p class="text-gray-800 dark:text-slate-400 mt-4">
                <textarea
                  v-model="recipe.text"
                  class="w-full text-gray-800 dark:text-slate-400 h-24"
                  placeholder="Recipe description"
                />
              </p>
            </div>

            <!-- Image -->
            <div class="w-full md:w-1/2 mt-4">
              <textarea
                v-model="recipe.images"
                class="w-full text-gray-800 dark:text-slate-400 h-24"
                placeholder="Image URL"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-start">
          <div class="w-full md:w-1/2 shadow-lg rounded-xl overflow-hidden md:mr-2 mb-4 md:mb-0">
            <div class="px-6 py-4">
              <h3 class="text-lg font-light font-serif text-gray-800 dark:text-gray-200 mb-3">
                Ingredients
              </h3>
              <textarea
                v-model="recipe.ingredients"
                class="text-gray-800 dark:text-slate-400 h-48"
              />
            </div>
          </div>

          <div class="w-full md:w-1/2 shadow-lg rounded-xl overflow-hidden md:ml-2">
            <div class="px-6 py-4">
              <h3 class="text-lg font-light font-serif text-gray-800 dark:text-gray-200 mb-3">
                Instructions
              </h3>
              <textarea
                v-model="recipe.instructions"
                class="text-gray-800 dark:text-slate-400 h-48"
              />
            </div>
          </div>
        </div>

        <div v-if="errorMessage !== ''" class="border border-red-400">
          {{ errorMessage }}
        </div>

        <div class="flex justify-center mt-4">
          <Button label="Save Recipe" size="lg" type="submit" name="save" />
          <Button label="Remove Recipe" size="lg" type="submit" name="delete" class="ml-4" />
        </div>
      </form>
    </Section>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { type MelaRecipe } from '~/types/melaRecipe'
import { useRecipeStore } from '~/stores/recipe'

const router = useRouter()
const recipeStore = useRecipeStore()

interface RecipeEditorProps {
  id?: string
  noRedirect?: boolean
}

const props = withDefaults(defineProps<RecipeEditorProps>(), {
  id: ''
})
const { id } = toRefs(props)

const { recipeMap } = storeToRefs(recipeStore)
const generateEmptyRecipe = () => ({
  id: '',
  name: '',
  prepTime: '',
  cookTime: '',
  totalTime: '',
  yield: '',
  text: '',
  images: '',
  ingredients: '',
  instructions: '',
  link: '',
  notes: ''
})
const recipe = useState<MelaRecipe>('recipe', () => generateEmptyRecipe())

const errorMessage = useState('errorMessage', () => '')

const updateFromStore = async (id: string) => {
  recipe.value = recipeMap.value?.[id] ?? generateEmptyRecipe()
}

watch(
  id,
  () => {
    if (!id.value) {
      console.warn('No ID provided')
      return
    }

    if (!recipeMap.value) {
      console.warn('No recipe map found')
      return
    }

    updateFromStore(id.value)
  },
  { immediate: true }
)

const handleForm = (event: SubmitEvent) => {
  const submitterName = event.submitter?.name
  if (!submitterName) {
    console.warn('No submitter name found')
    return
  }

  // Check if form is save or delete
  if (submitterName === 'save') {
    recipeStore
      .saveRecipe(recipe.value)
      .then(async (id: string) => {
        // Reload the recipe from the store to get the updated ID
        await updateFromStore(id)

        // Redirect to the new recipe
        await router.push(`/buon/appetito/${id}`)
      })
      .catch((error: Error) => {
        console.error('Error saving recipe', error)
        errorMessage.value = error.message
      })
  } else if (submitterName === 'delete') {
    recipeStore
      .removeRecipe(recipe.value.id)
      .then(() => {
        // Redirect to the recipe list
        router.push('/buon/appetito')
      })
      .catch((error: Error) => {
        console.error('Error deleting recipe', error)
        errorMessage.value = error.message
      })
  }
}
</script>
