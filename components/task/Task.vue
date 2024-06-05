<template>
  <div
    :class="`${ completed ? 'bg-opacity-90 bg-green-100 dark:bg-green-900' : ''}
    ${highlight? 'bg-primary-400 dark:bg-primary-700 shadow-primary-800': 'bg-white-50 dark:bg-white-700'} p-3 rounded-xl shadow-lg dark:shadow-lg`">
    <div v-if="isCreated" class="flex items-center gap-x-3 text-xs justify-start mb-2">
      <!-- Date -->
      <span
        v-if="formattedDueDate !== ''"
        :class="{'text-gray-600 dark:text-gray-400': !highlight}"
      >
        {{ formattedDueDate }}
      </span>
      <VSep height="10" />

      <!-- Status Label -->
      <label
        v-if="isCreated && title"
        :for="`task-checkbox-${id}`"
        :class="{'text-gray-600 dark:text-gray-400': !highlight}"
        class="hover:underline cursor-pointer focus:outline-none inline-block text-nowrap`">
        {{ completed ? '🎉 Completed' : 'Complete Task' }}
      </label>

      <template v-if="isCreated && title && completed">
        <VSep height="10" />
        <!-- Edit Button -->
        <button
          :class="{'text-gray-600 dark:text-gray-400': !highlight}"
          class="hover:underline"
          @click="editTask">
          Edit Task
        </button>
      </template>

      <VSep height="10" />

      <!-- Delete Button -->
      <button
        v-if="isCreated && title"
        class="text-red-600 dark:text-red-400 hover:underline"
        @click="deleteTask">
        Delete Task
      </button>
    </div>

    <div class="relative flex items-center">
      <!-- Checkbox -->
      <input
        v-if="isCreated && title"
        :id="`task-checkbox-${id}`"
        v-model="completed"
        type="checkbox"
        class="hidden"
        :class="{
          'text-white': highlight,
          'border-green-700 text-green-700': completed && !highlight,
          'border-gray-300': !completed
        }"
      >

      <!-- Title -->
      <textarea
        ref="textarea"
        v-model="title"
        class="w-full dark:text-gray-100 resize-none border-none focus:outline-none bg-transparent p-0 m-0 text-gray-900 placeholder-gray-900"
        :class="{ 'line-through': completed, 'font-serif italic': title?.length !== 0, 'dark:text-white dark:placeholder-white': highlight }"
        :disabled="completed"
        aria-label="Task description"
        rows="1"
        :placeholder="placeholder"
        @keydown.enter.prevent="emit('enter')"
        @keydown.delete="deleteTask"
      />
    </div>
  </div>

  <!-- Border -->
  <div class="border-b last-of-type:hidden my-4" />
</template>


<script lang="ts" setup>
const emit = defineEmits(['enter', 'delete'])

interface TaskProps {
  id?: string,
  isCreated?: boolean,
  highlight?: boolean,
  placeholder?: string,
}

withDefaults(defineProps<TaskProps>(), {
  id: '0',
  isCreated: true,
  highlight: false,
  placeholder: 'Type your task here ...'
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
 * Delete the task if the title is empty
 */
const deleteTask = () => emit('delete')

/**
 * Edit the task
 */
const editTask = () => {
  completed.value = false
  textarea.value?.focus()
}
</script>