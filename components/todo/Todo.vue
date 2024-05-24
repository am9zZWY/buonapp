<template>
  <div>
    <div class="relative mb-4 cursor-pointer flex items-center">
      <input
        v-if="todo"
        :id="`task-checkbox-${randomId}`"
        v-model="completed"
        type="checkbox"
        class="form-checkbox h-5 w-5 rounded-full border-2 focus:ring-0 mr-2 cursor-pointer"
        :class="{ 'border-green-700 text-green-700': todo?.completed, 'border-red-700': !todo?.completed }"
      >
      <textarea
        v-model="title"
        class="w-full text-gray-900 dark:text-gray-100 resize-none border-none focus:outline-none bg-transparent"
        :class="{ 'line-through': todo?.completed, 'font-serif italic': title?.length !== 0 }"
        :disabled="todo?.completed"
        aria-label="Todo Description"
        rows="1"
        placeholder="Type your task here..."
        @keydown.enter.prevent="emit('enter')"
        @keydown.delete="deleteTodo"
      />
      <label
        v-if="todo"
        :for="`task-checkbox-${randomId}`"
        class="text-xs mb-2 px-2 py-0.5 absolute top-3 right-3 border-1 rounded-2xl cursor-pointer"
        :class="{'border border-green-600 dark:text-white': todo.completed, 'border border-red-700  dark:text-white': !todo.completed}">
        {{ todo?.completed ? '🎉 Completed' : 'Not Completed' }}
      </label>
    </div>
    <p
      v-if="formattedDueDate !== ''"
      class="text-gray-600 dark:text-gray-400 font-extralight text-xs mt-2"
    >
      {{ formattedDueDate }}
    </p>
  </div>
  <div class="border-b last-of-type:hidden my-4" />
</template>

<script lang="ts" setup>
import { type Todo } from '~/types/todo'

interface TodoProps {
  todo?: Todo,
}

const emit = defineEmits(['enter', 'delete', 'completed'])
const randomId = Math.random().toString(36).substring(7)

const props = defineProps<TodoProps>()
const { todo } = toRefs(props)

const title = defineModel<string>('title')
const completed = ref(false)

/**
 * Computed property to format the due date
 */
const formattedDueDate = computed(() => {
  if (!todo?.value?.dueDate) {
    return ''
  }

  const dueDate = new Date(todo.value.dueDate)
  return dueDate.toLocaleDateString()
})

/**
 * Delete the todo if the title is empty
 */
const deleteTodo = () => {
  if (!title.value) {
    return
  }

  // If the title is empty, emit a delete event
  // == 1 because this method is called before the title is updated
  if (title.value.length === 1) {
    emit('delete')
  }
}

/**
 * Watch for the completed prop and emit the completed event
 */
watch(completed, (value) => {
  if (todo.value) {
    emit('completed', value)
  }
})

/**
 * Watch for the todo prop and update the title
 */
if (todo.value) {
  watch(todo.value, () => {
    if (!todo.value) {
      return
    }

    title.value = todo.value.title
    completed.value = todo.value.completed
  }, { immediate: true })
}
</script>
