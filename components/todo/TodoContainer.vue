<template>
  <ClientOnly>
    <div class="container">
      <Todo
        v-for="todoId in todosMap.keys()" :key="todoId" :todo="todosMap.get(todoId)"
        @completed="completeTodo(todoId, $event)" @delete="deleteTodo(todoId)" />
      <Todo v-model:title="title" @enter="addTodo" />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTodoStore } from '~/stores/todo'

const todoStore = useTodoStore()
const todosMap = computed(() => todoStore.todosMap)

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

const completeTodo = (todoId: string, completed: boolean) => {
  todoStore.completeTodo(todoId, completed)
}
</script>
