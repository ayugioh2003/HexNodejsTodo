import { v4 as uuidv4 } from 'uuid'

// config
import headers from '../../config/headers.js'
import errorHandle from '../../errorHandle.js'

export default (req, res) => {
  // todo delete
  if (req.method === 'DELETE') {
    try {
      const id = req.url.split('/').at(-1)
      const index = req.todos.findIndex((todo) => todo.id === id)

      if (index === -1) {
        console.log('todo not found')
        return errorHandle(res)
      }

      req.todos.splice(index, 1)
      res.writeHead(200, headers)
      res.write(JSON.stringify({ status: 'success', data: req.todos }))
      res.end()
    } catch (error) {
      console.log(error)
      errorHandle(res, error)
    }
  }
  // todo patch
  if (req.method === 'PATCH') {
    try {
      const title = JSON.parse(req.body).title

      if (!title) {
        console.log('title is required')
        return errorHandle(res)
      }

      const id = req.url.split('/').at(-1)
      const index = req.todos.findIndex((todo) => todo.id === id)

      if (index === -1) {
        console.log('todo not found')
        return errorHandle(res)
      }

      const todo = req.todos[index]
      todo.title = title
      res.writeHead(200, headers)
      res.write(JSON.stringify({ status: 'success', data: todo }))
      res.end()
    } catch (error) {
      console.log(error)
      errorHandle(res, error)
    }
  }
}
