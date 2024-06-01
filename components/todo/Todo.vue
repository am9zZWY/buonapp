<template>
  <div
    class="bg-white dark:bg-neutral-900 p-3 rounded-xl shadow-lg dark:shadow-lg"
    :class="{ 'bg-opacity-90 bg-green-100 dark:bg-green-900': completed }">
    <div v-if="isCreated" class="flex items-center gap-x-3 text-xs justify-start">
      <!-- Date -->
      <span
        v-if="formattedDueDate !== ''"
        class="text-gray-600 dark:text-gray-400"
      >
        {{ formattedDueDate }}
      </span>
      <div class="mx-2 h-8 bg-gray-300 dark:bg-neutral-600 w-px" />

      <!-- Status Label -->
      <label
        v-if="isCreated && title"
        :for="`task-checkbox-${id}`"
        class="text-gray-600 dark:text-gray-400 hover:underline cursor-pointer focus:outline-none inline-block text-nowrap">
        {{ completed ? '🎉 Completed' : 'Complete Task' }}
      </label>

      <template v-if="isCreated && title && completed">
        <div class="mx-2 h-8 bg-gray-300 dark:bg-neutral-600 w-px" />
        <!-- Edit Button -->
        <button
          class="text-primary-600 dark:text-primary-400 hover:underline"
          @click="editTodo">
          Edit Task
        </button>
      </template>

      <div class="mx-2 h-8 bg-gray-300 dark:bg-neutral-600 w-px" />
      <!-- Delete Button -->
      <button
        v-if="isCreated && title"
        class="text-red-600 dark:text-red-400 hover:underline"
        @click="emit('delete')">
        Delete Task
      </button>
    </div>

    <div class="relative flex items-center mt-2">
      <!-- Checkbox -->
      <input
        v-if="isCreated && title"
        :id="`task-checkbox-${id}`"
        v-model="completed"
        type="checkbox"
        class="hidden"
        :class="{ 'border-green-700 text-green-700': completed, 'border-gray-300': !completed }"
      >

      <!-- Title -->
      <textarea
        ref="textarea"
        v-model="title"
        class="w-full text-gray-900 dark:text-gray-100 resize-none border-none focus:outline-none bg-transparent p-0 m-0"
        :class="{ 'line-through': completed, 'font-serif italic': title?.length !== 0 }"
        :disabled="completed"
        aria-label="Todo Description"
        rows="1"
        placeholder="Type your task here..."
        @keydown.enter.prevent="emit('enter')"
        @keydown.delete="deleteTodo"
      />
    </div>
  </div>

  <!-- Border -->
  <div class="border-b last-of-type:hidden my-4" />
</template>


<script lang="ts" setup>
import type { VNodeRef } from 'vue'

const emit = defineEmits(['enter', 'delete'])

const textarea = ref<VNodeRef | null>(null)

interface TodoProps {
  id?: string,
  isCreated?: boolean
}

withDefaults(defineProps<TodoProps>(), {
  id: '0',
  isCreated: true
})
const title = defineModel<string>('title')
const dueDate = defineModel<Date>('dueDate')
const completed = defineModel<boolean>('completed')

/**
 * Computed property to format the due date
 */
const formattedDueDate = computed(() => {
  if (!dueDate.value) {
    return ''
  }

  return dueDate.value.toLocaleDateString()
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
 * Edit the todo
 */
const editTodo = () => {
  completed.value = false
  textarea.value?.focus()
}
</script>
