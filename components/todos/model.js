import { v4 as uuidv4 } from 'uuid'

const defaultTodos = [
  {
    id: '0fc88620-1a44-4654-b38c-7f0f59aca2af',
    title: 'Todo 1',
  },
]
class TodosModel {
  constructor(todos = defaultTodos) {
    this.todos = todos
  }

  getAll() {
    return this.todos
  }

  add({ title }) {
    const id = uuidv4()
    const todo = {
      id,
      title,
    }
    this.todos.push(todo)
    return todo
  }

  deleteAll() {
    this.todos.length = 0
    return this.todos
  }

  getById({ id }) {
    const result = this.todos.find((todo) => todo.id === id)
    return result
  }

  update({ id, title }) {
    const todo = this.todos.find((todo) => todo.id === id)
    todo.title = title
    return todo
  }

  deleteById({ id }) {
    const todo = this.todos.find((todo) => todo.id === id)
    const index = this.todos.indexOf(todo)
    this.todos.splice(index, 1)
    return todo
  }
}

const todosModel = new TodosModel()
export default todosModel
