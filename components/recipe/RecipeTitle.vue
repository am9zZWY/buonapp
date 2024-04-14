<!--
  - Copyright (c) 2023 Josef Müller.
  -->

<template>
    <div v-if="recipe" class="recipe-title-wrapper">
        <h3 class="subheader">
            {{ title }}
        </h3>
        <h2 class="recipe-title">
            <RouterLink :class="{ disabled: disableLink }" :to="recipeRoute">{{ recipe?.getName() }}</RouterLink>
        </h2>
        <div v-if="recipe?.getAuthors() !== ''" class="recipe-author">
            <strong>{{ $t('Recipe.Src.By') }} <a :href="recipe?.src?.url" class="recipe-author-link" rel="nofollow"
                                                 target="_blank">{{
                                                     recipe?.getAuthors()
                                                 }}</a></strong>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { computed, PropType, toRefs } from 'vue';
import { Recipe } from '@/shared';

const props = defineProps({
    recipe: {
        type: Object as PropType<Recipe>, required: true
    }, title: {
        type: String, required: false
    }, disableLink: {
        type: Boolean, required: false, default: false
    }
})

const {recipe} = toRefs(props)
const recipeRoute = computed<string>(() => recipe?.value?.getRoute() ?? '')
</script>

<style scoped>
/* Reset some default styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


a {
    color: var(--ion-text-color);
}

.recipe-title-wrapper {
    margin-bottom: 20px;
}

.recipe-title {
    font-size: var(--font-size-larger);
    margin-bottom: 10px;
}

.recipe-title a {
    font-family: var(--font-special);
    color: var(--ion-color-primary);
}

.recipe-title a:hover {
    color: var(--ion-color-primary-shade);
}

.recipe-author {
    font-size: 20px; /* Increased font size */
}

.recipe-author-link {
    cursor: pointer;
}
</style>