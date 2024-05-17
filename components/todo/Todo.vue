<template>
  <div
    class="rounded-xl shadow-lg bg-white dark:bg-gray-800 p-4 hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer">
    <p class="text-gray-600 dark:text-gray-400">
      <textarea v-model="description" />
    </p>
    <p class="text-gray-600 font-extralight text-xs">
      {{ todo.dueDate }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type Todo } from '~/types/todo'

interface TodoProps {
  todo: Todo
}

const props = defineProps<TodoProps>()
const { todo } = toRefs(props)

const description = ref('')
watch(todo.value, () => {
  description.value = todo.value.description
}, { immediate: true })
watch(description, () => {
  todo.value.description = description.value
})
</script>
