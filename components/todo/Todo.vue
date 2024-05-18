<template>
  <div>
    <div
      class="relative rounded-xl shadow-lg bg-white dark:bg-neutral-800 p-6 pb-2 mb-4 transition duration-500 ease-in-out transform hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <p
        v-if="todo?.completed !== undefined"
        class="text-xs mb-2 px-2 py-0.5 absolute top-3 right-3 border-1 rounded-2xl"
        :class="{'bg-green-300 dark:bg-green-400 text-green-700 dark:text-white': todo?.completed, 'bg-red-300 dark:bg-red-400 text-red-700 dark:text-white': !todo?.completed}"
        @click="todo.completed = !todo?.completed ?? false"
      >
        {{ todo?.completed ? 'Done 🎉' : 'Not done' }}
      </p>
      <textarea
        v-model="title"
        class="description w-full text-lg text-gray-900 dark:text-gray-100 resize-none border-none focus:outline-none bg-transparent mb-2"
        :class="{ 'line-through': todo?.completed }"
        :disabled="todo?.completed"
        aria-label="Todo Description"
        rows="1"
        placeholder="Type your task here..."
        @input="emit('update:modelValue', $event.target?.value ?? '')"
        @keydown.enter.prevent="emit('enter')"
        @keydown.delete="deleteTodo"
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
  todo?: Todo,
  modelValue?: string,
}

const emit = defineEmits(['enter', 'update:modelValue', 'delete'])

const props = defineProps<TodoProps>()
const { todo, modelValue } = toRefs(props)

const title = ref('')
const formattedDueDate = computed(() => {
  if (!todo?.value?.dueDate) {
    return ''
  }

  const dueDate = new Date(todo.value.dueDate)
  return dueDate.toLocaleDateString()
})

const deleteTodo = () => {
  // If the title is empty, emit a delete event
  // == 1 because this method is called before the title is updated
  if (title.value.length === 1) {
    emit('delete')
  }
}

watch(modelValue, () => {
  if (modelValue.value || modelValue.value === '') {
    title.value = modelValue.value ?? ''
  }
}, { immediate: true })

if (todo.value) {
  watch(todo.value, () => {
    if (!todo.value) {
      return
    }

    title.value = todo.value.title
  }, { immediate: true })
}
</script>
