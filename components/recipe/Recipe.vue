<!--
  - Copyright (c) 2023-2024 Josef Müller.
  -->

<template>
    <div class="recipe-wrapper">
        <div class="recipe-header ion-margin-bottom">
            <div class="recipe-header-text-wrapper">
                <!-- Title -->
                <RecipeTitle :recipe="recipe" :title="t('Recipe.LetsCook')" disable-link/>
                <!-- Save and Share -->
                <IonButtons>
                    <IonButton v-if="canShareRecipe" aria-valuetext="Share Recipe"
                               @click="shareRecipe()">
                        <IonIcon :icon="shareSocial"/>
                    </IonButton>
                    <IonButton aria-valuetext="Like Recipe" color="favorite" @click="toggleSave()">
                        <IonIcon :color="isSaved ?? false ? 'favorite' : undefined "
                                 :icon="isSaved ?? false ? heart: heartOutline"/>
                    </IonButton>
                    <IonButton aria-valuetext="Start Cooking" color="primary">
                        <IonIcon :icon="play"/>
                    </IonButton>
                </IonButtons>
                <!-- Tags -->
                <div class="recipe-tags ion-margin-bottom">
                    <IonChip v-for="tag in recipe?.getTags()" :key="tag" outline>
                        {{ tag }}
                    </IonChip>
                </div>
                <!-- Description -->
                <IonText class="recipe-description desc ion-margin-top">
                    <ReadMore :text="recipe?.getDescription()"/>
                </IonText>
            </div>
            <div class="recipe-image-wrapper">
                <IonImg :src="recipe?.props?.imgUrl" alt="Header Image" class="recipe-image"/>
            </div>
        </div>

        <TwoColumnLayout layout="rightBigger">
            <!-- Left -->
            <!-- Ingredients and tools that are needed -->
            <template v-if="ingredients.length > 0 || tools.length > 0" #left>
                <div class="sticky">
                    <div class="header">
                        <!-- Show the amount of ingredients -->
                        <h2>{{ itemsFromRecipe.length }} {{ $t('Recipe.Ingredient', itemsFromRecipe.length) }}</h2>
                    </div>
                    <IonCard v-if="ingredients.length > 0">
                        <IonCardContent>
                            <IonRange v-model="servings" :label="`${servings} ${$t('Recipe.Serving', servings)}`"
                                      :max="10" :min="1"
                                      :step="1" color="secondary"
                                      label-placement="start" pin snaps/>
                            <!-- Show the ingredients -->
                            <ItemList :items="ingredients"/>
                        </IonCardContent>
                    </IonCard>
                    <IonCard v-if="tools.length > 0">
                        <IonCardContent>
                            <!-- ... and the tools -->
                            <ItemList :items="tools"/>
                        </IonCardContent>
                    </IonCard>
                </div>
            </template>

            <!-- Right -->
            <!-- Steps -->
            <template #right>
                <div class="header">
                    <!-- Show the amount of steps -->
                    <h2>{{ $t('Recipe.Preparation') }}
                    </h2>
                    <!-- ... and the duration -->
                    <Duration :duration="recipe?.getDuration()"/>
                </div>
                <!-- Steps -->
                <div class="steps-container">
                    <template v-for="(step, stepIndex) in [...steps]" :key="stepIndex">
                        <StepComponent :amount-steps="steps.length" :recipe-id="recipe?.getId()" :step="step"
                                       :step-index="stepIndex" class="step"/>
                    </template>
                    <!-- Good Appetite -->
                    <!-- If there are no steps, don't show the good appetite step -->
                    <StepComponent v-if="steps.length > 0" :step="goodAppetiteStep" no-content/>
                </div>
            </template>
        </TwoColumnLayout>

        <!-- Source -->
        <IonItem lines="none">
            <IonNote>
                <p v-html="source"/>
            </IonNote>
        </IonItem>
    </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, toRefs, watch } from 'vue';
import {
    IonButton, IonButtons, IonCard, IonCardContent, IonChip, IonIcon, IonImg, IonItem, IonNote, IonRange, IonText,
} from '@ionic/vue';
import { ItemList, ReadMore, Recipe, recipeBy, RecipeItem, Step, STEP_TYPES } from '@/shared';
import { heart, heartOutline, play, shareSocial } from 'ionicons/icons';
import { CanShareResult, Share } from '@capacitor/share';
import { useI18n } from 'vue-i18n';
import { useRecipeStore } from '@/app/storage';
import Duration from '@/shared/components/recipe/chip/Duration.vue';
import { RecipeTitle, StepComponent, TwoColumnLayout } from '@/app/components';

/* Recipe */
const props = defineProps({
    recipe: {
        type: Object as PropType<Recipe>, required: true,
    },
});
const {recipe} = toRefs(props);
const authors = computed(() => recipe?.value?.getAuthors() ?? '');
const recipeStore = useRecipeStore();
const isSaved = computed(() => recipeStore.getSavedRecipesIds.includes(recipe?.value?.getId()));
const toggleSave = () => recipeStore.setSaved(recipe?.value);

const itemsFromRecipe = computed<RecipeItem[]>(() => recipe?.value?.getRecipeItems() ?? []);
const ingredients = computed<RecipeItem[]>(() => itemsFromRecipe.value
    .filter((item: RecipeItem) => item.type === 'ingredient'))
const tools = computed<RecipeItem[]>(() => itemsFromRecipe.value.filter((item: RecipeItem) => item.type === 'tool'))
const steps = computed<Step[]>(() => recipe?.value?.steps ?? [])

// Source
const source = computed(() => recipeBy(authors.value, recipe?.value?.src.url ?? ''))

// Servings
const servings = ref(recipe?.value?.servings)
watch(servings, (newServings, oldServings) => {
    if (newServings !== oldServings) {
        recipe?.value?.setServings(newServings);
    }
});

// i18n
const {t} = useI18n()

// Good Appetite Step
const goodAppetiteStep = new Step()
goodAppetiteStep.type = STEP_TYPES.HEADER
goodAppetiteStep.setDescription(t('Recipe.GoodAppetite'))

/* Share */
const shareRecipe = () => recipe?.value?.share();
// check if the browser supports sharing
const canShareRecipe = ref(false);
Share.canShare().then((canShareResult: CanShareResult) => {
    canShareRecipe.value = canShareResult.value;
})
</script>


<style scoped>
.recipe-wrapper {
    width: 100%;
}

.recipe-description {
    overflow-y: auto;
    max-height: 250px;
}

.recipe-header {
    display: flex;
    align-items: center;
}

.recipe-image-wrapper {
    flex: 1;
    width: 100%;
}

.recipe-image::part(image) {
    max-width: 400px;
    height: auto;
    border-radius: var(--border-radius);
    margin: auto;
}

.recipe-header-text-wrapper {
    flex: 2;
    margin: 0 var(--margin) 0 0;
}

.recipe-tags {
    margin-top: var(--margin);
}

@media (max-width: 736px) {
    .recipe-header {
        flex-direction: column;
        display: flex;
        align-items: flex-start;
    }

    .recipe-header-text-wrapper {
        margin-bottom: var(--margin-medium);
    }

    .recipe-image-wrapper {
        justify-content: center;
    }
}

.recipe-servings {
    --border-radius: 15px;
    margin-bottom: var(--margin);
}

.recipe-servings-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.step {
    margin-bottom: var(--margin-large);
}
</style>