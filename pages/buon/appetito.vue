<template>
  <!-- Add recipes -->
  <ThumbnailLinkContainer title="Ricetta del giorno" subtitle="Le migliori ricette per te">
    <!-- TODO: Add recipe of the day -->
  </ThumbnailLinkContainer>

  <ThumbnailLinkContainer title="Cosa cucinare oggi? 🍝">
    <ThumbnailLink v-for="recipe in recipes" :key="recipe.id" :title="recipe.name" :description="recipe.description" to="/buon/appetito/ricetta/:id">
      <template #description>
        <p>Today's menu: pasta, pizza, and more!</p>
      </template>
    </ThumbnailLink>
  </ThumbnailLinkContainer>

  <!-- TODO: Allow to add new recipes -->
  <Button label="Add your own recipe" to="/buon/appetito/aggiungi-ricetta" />
</template>

<script lang="ts" setup>
const recipes = ref([
  {id: 1, name: 'Pasta al pomodoro', description: 'La ricetta classica della pasta al pomodoro'},
  {id: 2, name: 'Pizza margherita', description: 'La ricetta classica della pizza margherita'},
  {id: 3, name: 'Tiramisù', description: 'La ricetta classica del tiramisù'},
  {id: 4, name: 'Caffè', description: 'La ricetta classica del caffè'},
]);
</script>
