<template>
  <div class="container">
    <!-- Textarea and Buttons Container -->
    <div class="flex items-center gap-x-3">
      <div class="bg-white-50 dark:bg-white-700 p-3 rounded-xl shadow-md dark:shadow-lg">
        <!-- Textarea -->
        <span class="font-serif italic">Sort by </span>
        <input
          v-model.trim="query"
          placeholder="..."
          type="text"
          class="font-serif italic text-gray-900 dark:text-gray-100
          resize-none border-none focus:outline-none bg-transparent p-0 m-0"
          aria-label="Task Description"
          @keydown.enter.prevent="rankTodos"
        >

        <DownloadProgress
          v-if="downloadProgress > 0 && downloadProgress < 100"
          :progress="downloadProgress"
        />
      </div>

      <VSep v-if="isVerified" height="10" />

      <!-- Load from Server Button -->
      <button
        v-if="isVerified"
        class="rounded-xl shadow-md dark:shadow-lg cursor-pointer text-nowrap p-3
        h-full hover:shadow-inner hover:-translate-y-0.5 hover:underline transition-all duration-300 ease-in-out
          flex items-center justify-center"
        @click="loadTasks"
      >
        <span class="flex items-center justify-center size-8 -ml-2.5">
          <UIcon name="codicon:cloud-download" />
        </span>
        Load from Server
      </button>
    </div>

    <div class="my-8">
      <Task key="new-todo" v-model:title="title" :is-created="false" highlight @save="addTodo" />
      <Task
        v-for="(task, todoIndex) in tasks"
        :id="task.taskId"
        :key="task.taskId"
        v-model:completed="tasks[todoIndex].completed"
        v-model:title="tasks[todoIndex].title"
        v-model:dueDate="tasks[todoIndex].dueDate"
        v-model:deleted="tasks[todoIndex].deleted"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTaskStore } from '~/stores/task'
import { storeToRefs } from 'pinia'

const session = useSessionStore()
const isVerified = computed(() => session.isVerified)

const query = useState('query', () => '')
const todoStore = useTaskStore()
const { tasks } = storeToRefs(todoStore)
const nonDeletedTasks = computed(() => todoStore.nonDeletedTasks)

const title = useState('title', () => '')
const addTodo = () => {
  if (title.value.trim() === '') {
    return
  }

  todoStore.addFromTitle(title.value)
  title.value = ''
}

const loadTasks = () => todoStore.getFromApi()

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
