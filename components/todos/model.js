class TodosModel {
  constructor() {
    this.todos = [
      {
        id: '0fc88620-1a44-4654-b38c-7f0f59aca2af',
        title: '早上起來刷刷牙',
      },
    ]
  }
  getAll() {
    return this.todos
  }

  add(todo) {
    this.todos.push(todo)
    return this.todos
  }

  deleteAll() {
    this.todos.length = 0
    return this.todos
  }

  getIndexById(id) {
    const index = this.todos.findIndex((todo) => todo.id === id)
    return index
  }

  deleteById(id) {
    const index = this.getIndexById(id)
    const todo = this.todos.splice(index, 1)
    return todo
  }

  getById(id) {
    const index = this.getIndexById(id)
    return this.todos[index]
  }

  updateById({ id, title }) {
    const todo = this.getById(id)
    todo.title = title
    return todo
  }
}

const todosModel = new TodosModel()
export default todosModel
