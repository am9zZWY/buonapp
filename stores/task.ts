import {defineStore} from "pinia";
import {ref} from "vue";

type Task = {
    title: string
    description?: string
    completed: boolean
    createdDate: Date
    dueDate?: Date | undefined
    priority: 'low' | 'medium' | 'high'
}


export const todoStore = defineStore('todo', () => {
    const todos = ref<Map<string, Task>>(new Map())

    function addTodo(title: string, dueDate: Date, description: string = '', priority: 'low' | 'medium' | 'high' = 'medium') {
        const createdDate = new Date()
        const id = createdDate.getTime().toString()

        todos.value.set(id, {
            title,
            description,
            completed: false,
            createdDate,
            dueDate,
            priority
        })
    }

    function removeTodo(id: string): boolean {
        return todos.value.delete(id)
    }

    return {todos, addTodo, removeTodo}
})
