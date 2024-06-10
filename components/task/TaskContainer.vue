<template>
  <div class="container">
    <!-- Textarea and Buttons Container -->
    <div v-show="todos.length > 1" class="flex items-center gap-x-3">
      <div class="bg-white-50 dark:bg-white-700 p-3 rounded-xl shadow-md dark:shadow-lg">
        <!-- Textarea -->
        <span class="font-serif italic">Sort by </span>
        <input
          v-model.trim="query"
          :disabled="todos.length === 0 || (downloadProgress > 0 && downloadProgress < 100)"
          placeholder="..."
          type="text"
          class="font-serif italic text-gray-900 dark:text-gray-100 resize-none border-none focus:outline-none bg-transparent p-0 m-0"
          aria-label="Task Description"
          rows="2"
          @keydown.enter.prevent="rankTodos"
        >

        <DownloadProgress
          v-if="downloadProgress > 0 && downloadProgress < 100"
          :progress="downloadProgress"
        />
      </div>

      <!-- <div class="w-full flex flex-col gap-y-2">
        <div class="w-full flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div class="flex flex-col sm:flex-row gap-2">
            <button
              class="btn btn-primary bg-primary-500 text-white px-3 py-0.5 rounded-xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-nowrap">
              Sort by date
            </button>
            <VSep />
            <button
              class="btn btn-primary bg-primary-500 text-white px-3 py-0.5 rounded-xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-nowrap"
              @click="rankTodos">
              Sort by title
            </button>
            <VSep />
            <button
              class="btn btn-primary bg-primary-500 text-white px-3 py-0.5 rounded-xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-nowrap"
              @click="rankTodos">
              Completed to bottom
            </button>
            <VSep />
            <button
              class="btn btn-primary bg-primary-500 text-white px-3 py-0.5 rounded-xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-nowrap"
              @click="rankTodos">
              Remove completed
            </button>
          </div>
        </div>
      </div> -->
    </div>

    <HSep v-show="todos.length > 1" height="10" />

    <div class="mb-8">
      <Task
        v-for="(todo, todoIndex) in todos"
        :id="todo.id"
        :key="todo.id"
        v-model:completed="todos[todoIndex].completed"
        v-model:title="todos[todoIndex].title"
        v-model:dueDate="todos[todoIndex].dueDate"
        @delete="deleteTodo(todos[todoIndex].id)"
      />
      <Task key="new-todo" v-model:title="title" :is-created="false" highlight @save="addTodo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTaskStore } from '~/stores/task'

const query = useState('query', () => '')
const todoStore = useTaskStore()
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

const downloadProgress = useState('downloadProgress', () => 0)
const rankTodos = () => {
  const ltfDownloadProgress = todoStore.rankBy(query.value)
  if (!ltfDownloadProgress) {
    return
  }

  watch(ltfDownloadProgress, (newProgress) => {
    downloadProgress.value = newProgress
  })
}
</script>
