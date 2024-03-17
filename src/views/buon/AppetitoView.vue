<template>
    <!-- Add recipes -->
    <ba-thumbnails-container>
        <ba src="https://picsum.photos/512" alt="Thumbnail Image"/>
        <ba-thumbnail-link src="https://picsum.photos/512" alt="Thumbnail Image"/>
        <ba-thumbnail-link src="https://picsum.photos/512" alt="Thumbnail Image"/>
    </ba-thumbnails-container>
</template>

<script lang="ts" setup>
import BaThumbnailLink from '@/stories/thumbnail-link/ThumbnailLink.vue'
import BaThumbnailsContainer from "@/stories/thumbnail-link/ThumbnailLinkContainer.vue";
</script>
