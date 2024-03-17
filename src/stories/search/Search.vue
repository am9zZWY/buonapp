<template>
  <div class="searchbar-wrapper active">
    <div ref="searchbar">
      <div class="searchbar-blur" />
      <div class="searchbar-search-wrapper active">
        <input
          ref="searchbarInput"
          v-model="filterInput"
          :placeholder="placeholder"
          class="searchbar-search"
          @ionClear="filterInput = ''"
        />
        <button class="searchbar-button search"></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import './search.css'

const filterInput = ref('')

const props = withDefaults(
  defineProps<{
    placeholder: string
  }>(),
  {
    placeholder: 'Search anything...'
  }
)
</script>
