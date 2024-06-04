<template>
  <div class="container">
    <!-- Textarea and Buttons Container -->
    <div v-if="todos.length > 0" class="flex items-center gap-x-3">
      <div class="bg-white-50 dark:bg-white-700 p-3 rounded-xl shadow-md dark:shadow-lg cursor-pointer">
        <!-- Textarea -->
        <input
          v-model.trim="query"
          :disabled="todos.length === 0" placeholder="Rank todos by..."
          type="text"
          class="text-gray-900 dark:text-gray-100 resize-none border-none focus:outline-none bg-transparent p-0 m-0"
          aria-label="Todo Description"
          rows="2"
          @keydown.enter.prevent="rankTodos"
        >
        <button
          class="btn btn-primary bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-nowrap"
          :disabled="todos.length === 0" @click="rankTodos">
          <UIcon name="tabler:sparkles" />
        </button>
      </div>
    </div>

    <div v-if="todos.length > 0" class="border-b my-4" />

    <div class="mb-8">
      <LazyTodo
        v-for="(todo, todoIndex) in todos" :id="todo.id"
        :key="todo.id"
        v-model:completed="todos[todoIndex].completed"
        v-model:title="todos[todoIndex].title"
        v-model:dueDate="todos[todoIndex].dueDate"
        @delete="deleteTodo(todos[todoIndex].id)" />
      <Todo v-model:title="title" :is-created="false" @enter="addTodo" />
    </div>

    <div v-if="todos.length > 1" class="w-full flex flex-col gap-y-2">
      <div v-if="false" class="w-full flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row gap-2">
          <button
            class="btn btn-primary bg-primary-500 text-white px-3 py-0.5 rounded-2xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-nowrap">
            Sort by date
          </button>
          <button
            class="btn btn-primary bg-primary-500 text-white px-3 py-0.5 rounded-xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-nowrap"
            @click="rankTodos">
            Sort by title
          </button>
          <button
            class="btn btn-primary bg-primary-500 text-white px-3 py-0.5 rounded-xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-nowrap"
            @click="rankTodos">
            Completed to bottom
          </button>
          <button
            class="btn btn-primary bg-primary-500 text-white px-3 py-0.5 rounded-xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-nowrap"
            @click="rankTodos">
            Remove completed
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTodoStore } from '~/stores/todo'

const query = useState('query', () => '')
const todoStore = useTodoStore()
const todos = computed(() => todoStore.todos)
watch(todos, (newTodos) => {
  todoStore.todos = newTodos
})

const title = useState('title', () => '')
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
const deleteCompleted = () => {
  todoStore.removeCompleted()
}

const rankTodos = () => {
  todoStore.rankBy(query.value)
}

</script>
