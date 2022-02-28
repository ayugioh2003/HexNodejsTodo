import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

class TodosModel {
  constructor() {
    this.db = {}
  }

  open() {
    let that = this
    return open({
      filename: 'memory',
      driver: sqlite3.Database,
    })
      .then(async (db) => {
        // create Todos table
        await db.exec(`CREATE TABLE IF NOT EXISTS Todos (
          id   TEXT PRIMARY KEY,
          title TEXT    NOT NULL
        );`)

        // insert some test data
        const defaultId = '0fc88620-1a44-4654-b38c-7f0f59aca2af'
        await db.exec(`
          INSERT INTO Todos(id, title) 
          SELECT '${defaultId}', 'Learn SQLite'
          WHERE NOT EXISTS(SELECT * FROM Todos WHERE id = '${defaultId}');
        `)

        that.db = db
      })
      .catch((error) => console.error('db error', error))
  }
  close() {
    return this.db.close()
  }

  getAll() {
    return this.db.all(`SELECT * FROM Todos`)
  }

  add(todo) {
    return this.db.exec(
      `INSERT INTO Todos (id, title)
      VALUES ('${todo.id}', '${todo.title}')`
    )
  }

  deleteAll() {
    return this.db.exec(`DELETE FROM Todos`)
  }

  async getIndexById(id) {
    const todos = await this.getAll()
    const index = todos.findIndex((todo) => todo.id === id)
    return index
  }

  deleteById(id) {
    return this.db.exec(`DELETE FROM Todos WHERE id = '${id}'`)
  }

  getById(id) {
    return this.db.get(`SELECT * FROM Todos WHERE id = '${id}'`)
  }

  async updateById({ id, title }) {
    await this.db.exec(
      `
          UPDATE Todos
          SET title = '${title}'
          WHERE id = '${id}'
        `
    )
    const todo = await this.getById(id)
    return todo
  }
}

const todosModel = new TodosModel()
await todosModel.open()
// await todosModel.close()
export default todosModel
