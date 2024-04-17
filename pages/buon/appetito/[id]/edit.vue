<template>
  <RecipeEditor :id="id" no-redirect />
</template>

<script lang="ts" setup>
const route = useRoute()
const id = computed(() => {
  const id = route.params.id as string
  if (!id) {
    return null
  }

  return id
})
</script>
