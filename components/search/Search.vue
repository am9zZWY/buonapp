<template>
  <div class="relative">
    <UInput
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      class="w-full"
      :append-icon="appendIcon"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const searchQuery = ref('');
const appendIcon = 'NuxtUiIconSearch';

const props = withDefaults(
  defineProps<{
    placeholder: string
  }>(),
  {
    placeholder: 'Search anything...'
  }
)
</script>
