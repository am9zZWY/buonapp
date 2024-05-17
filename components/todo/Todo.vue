<template>
  <div>
    <div
      class="relative rounded-xl shadow-lg bg-white dark:bg-neutral-800 p-6 pb-2 mb-4 transition duration-500 ease-in-out transform hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <p class="status text-xs text-blue-500 dark:text-blue-300 mb-2">
        {{ todo.done ? 'Done' : 'Not done' }}
      </p>
      <textarea
        v-model="description"
        class="description w-full text-lg text-gray-900 dark:text-gray-100 resize-none border-none focus:outline-none bg-transparent mb-2"
        aria-label="Task Description"
        rows="1"
        placeholder="Type your task here..."
      />
      <p v-if="formattedDueDate !== ''" class="text-gray-600 dark:text-gray-400 font-extralight text-xs mt-2">
        {{ formattedDueDate }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Todo } from '~/types/todo'

interface TodoProps {
  todo: Todo
}

const props = defineProps<TodoProps>()
const { todo } = toRefs(props)

const formattedDueDate = computed(() => {
  if (!todo.value.dueDate) {
    return ''
  }

  const dueDate = new Date(todo.value.dueDate)
  return dueDate.toLocaleDateString()
})

const description = ref('')
watch(todo.value, () => {
  description.value = todo.value.description
}, { immediate: true })

watch(description, () => {
  todo.value.description = description.value
})
</script>

<style scoped>
.status {
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
}
</style>
