import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Todo } from '~/types/todo'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Map<string, Todo>>(new Map())

  function addTodo(title: string, dueDate: Date, priority: 'low' | 'medium' | 'high' = 'medium') {
    const createdDate = new Date()
    const id = createdDate.getTime().toString()

    todos.value.set(id, {
      title: title,
      completed: false,
      createdDate: createdDate,
      dueDate: dueDate,
      priority: priority,
    } as Todo)

    return id
  }

  function addTodoFromDescription(title: string) {
    return addTodo(title, new Date())
  }

  function removeTodo(id: string): boolean {
    return todos.value.delete(id)
  }

  return { todos, addTodo, addTodoFromTitle: addTodoFromDescription, removeTodo }
})
