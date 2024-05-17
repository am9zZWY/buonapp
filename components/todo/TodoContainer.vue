<template>
  <div class="container mx-auto p-4">
    <Todo v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { defaultTodo, type Todo } from '~/types/todo'

const todos = ref<Todo[]>([
  defaultTodo,
  { ...defaultTodo, id: '2', description: 'Buy some milk' },
  { ...defaultTodo, id: '3', description: 'Go to the gym' }
])
</script>
