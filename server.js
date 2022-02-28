import http from 'http'
import { v4 as uuidv4 } from 'uuid'

import responseHandler from './utils/responseHandler.js'

const todos = [
  {
    id: '0fc88620-1a44-4654-b38c-7f0f59aca2af',
    title: 'test data',
  },
]

const app = (req, res) => {
  let body = ''
  req.on('data', (data) => {
    body += data
  })
  req.on('end', () => {
    if (req.url === '/') {
      responseHandler({ res, code: 200, data: 'Hello World ~~~' })
      return
    }
    if (req.method === 'OPTIONS') {
      responseHandler({ res, code: 200, data: 'OK' })
      return
    }

    // todos
    if (req.url === '/todos') {
      if (req.method === 'GET') {
        responseHandler({
          res,
          code: 200,
          data: todos,
        })
        return
      }
      if (req.method === 'POST') {
        try {
          const { title } = JSON.parse(body)

          if (!title) {
            throw new Error('title is required')
          }

          const todo = {
            id: uuidv4(),
            title,
          }
          todos.push(todo)
          responseHandler({
            res,
            code: 200,
            data: todos,
          })
        } catch (error) {
          responseHandler({
            res,
            code: 400,
            errorMessage: error.message || error.toString(),
          })
        }
        return
      }
      if (req.method === 'DELETE') {
        todos.length = 0
        responseHandler({
          res,
          code: 200,
          data: todos,
        })
        return
      }
    }

    // todo
    if (req.url.startsWith('/todos/')) {
      if (req.method === 'PATCH') {
        try {
          const { title } = JSON.parse(body)
          if (!title) {
            throw new Error('title is required')
          }

          const id = req.url.split('/').at(-1)
          if (!id) {
            throw new Error('id is required')
          }

          const index = todos.findIndex((todo) => todo.id === id)
          todos[index].title = title

          responseHandler({
            res,
            code: 200,
            data: todos[index],
          })
        } catch (error) {
          responseHandler({
            res,
            code: 400,
            errorMessage: error.message || error.toString(),
          })
        }
        return
      }
      if (req.method === 'DELETE') {
        try {
          const id = req.url.split('/').at(-1)
          if (!id) {
            throw new Error('id is required')
          }

          const todo = todos.find((todo) => todo.id === id)
          todos.filter((todo) => todo.id !== id)
          responseHandler({
            res,
            code: 200,
            message: '成功刪除此 todo',
            data: todo,
          })
        } catch (error) {
          responseHandler({
            res,
            code: 400,
            errorMessage: error.message || error.toString(),
          })
        }
        return
      }
    }

    // else
    responseHandler({ res, code: 404, data: 'Not Found' })
    return
  })
}
const server = http.createServer(app)

const PORT = process.env.PORT || 3005
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
