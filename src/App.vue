<template>
    <div class="mx-5">
        <ba-main>
            <RouterView/>
        </ba-main>
    </div>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import BaMain from '@/stories/page/Main.vue'
</script>
