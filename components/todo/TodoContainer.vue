<template>
  <div class="container mx-auto p-4">
    <Todo v-for="todoId in todos.keys()" :key="todoId" :todo="todos.get(todoId)" @delete="deleteTodo(todoId)" />
    <Todo v-model="title" @enter="addTodo" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTodoStore } from '~/stores/todo'
import type { Todo } from '~/types/todo'

const todoStore = useTodoStore()
const todos = computed<Map<string, Todo>>(() => todoStore.todos)

const title = ref('')
const addTodo = () => {
  if (title.value.trim() === '') {
    return
  }

  todoStore.addTodoFromTitle(title.value)
  title.value = ''
}

const deleteTodo = (todoId: string) => {
  todoStore.removeTodo(todoId)
}
</script>
