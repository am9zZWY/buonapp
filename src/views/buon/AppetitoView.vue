<template>
    <!-- Add recipes -->
    <ba-thumbnails-container title="Ricetta del giorno" subtitle="Le migliori ricette per te">
        <!-- TODO: Add recipe of the day -->
    </ba-thumbnails-container>

    <ba-thumbnails-container title="Cosa cucinare oggi? 🍝">
        <ba-thumbnail-link v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"/>
    </ba-thumbnails-container>

    <!-- TODO: Allow to add new recipes -->
    <ba-button label="Add your own recipe" to="/appetito/aggiungi-ricetta"/>
</template>

<script lang="ts" setup>
import BaThumbnailLink from '@/stories/thumbnail-link/ThumbnailLink.vue'
import BaThumbnailsContainer from "@/stories/thumbnail-link/ThumbnailLinkContainer.vue";
import BaButton from "@/stories/button/Button.vue";
import {useRecipeStore} from "@/stores";
import {computed} from "vue";

const recipeStore = useRecipeStore();
const recipes = computed(() => recipeStore.recipes);
</script>
