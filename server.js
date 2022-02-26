import http from 'http'
import { v4 as uuidv4 } from 'uuid'
import headers from './config/headers.js'
import errorHandle from './errorHandle.js'

const todos = [
  {
    id: '0fc88620-1a44-4654-b38c-7f0f59aca2af',
    title: '早上起來刷刷牙',
  },
]

const requestListener = (req, res) => {
  let body = ''
  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('end', () => {
    if (req.method == 'OPTIONS') {
      res.writeHead(200, headers)
      res.write(JSON.stringify({ status: 'success' }))
      return res.end()
    }
    if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, headers)
      res.write(JSON.stringify({ status: 'success', data: [] }))
      return res.end()
    }

    // ------------ todos ------------
    // todos get
    if (req.url === '/todos' && req.method === 'GET') {
      res.writeHead(200, headers)
      res.write(JSON.stringify({ status: 'success', data: todos }))
      return res.end()
    }
    // todo post
    else if (req.url === '/todos' && req.method === 'POST') {
      try {
        const title = JSON.parse(body).title

        if (!title) {
          console.log('title is required')
          return errorHandle(res, error)
        }

        const todo = {
          id: uuidv4(),
          title,
        }
        todos.push(todo)
        res.writeHead(200, headers)
        res.write(JSON.stringify({ status: 'success', data: todo }))
        return res.end()
      } catch (error) {
        errorHandle(res, error)
      }
    }
    // todo delete
    else if (req.url === '/todos' && req.method === 'DELETE') {
      try {
        todos.length = 0
        res.writeHead(200, headers)
        res.write(JSON.stringify({ status: 'success', data: todos }))
        res.end()
      } catch (error) {
        console.log(error)
        return errorHandle(res, error)
      }
    }
    // ------------ todo ------------
    // todo delete
    else if (req.url.includes('/todos/') && req.method === 'DELETE') {
      try {
        const id = req.url.split('/').at(-1)
        const index = todos.findIndex((todo) => todo.id === id)

        if (index === -1) {
          console.log('todo not found')
          return errorHandle(res)
        }

        todos.splice(index, 1)
        res.writeHead(200, headers)
        res.write(JSON.stringify({ status: 'success', data: todos }))
        res.end()
      } catch (error) {
        console.log(error)
        errorHandle(res, error)
      }
    }
    // todo patch
    else if (req.url.includes('/todos/') && req.method === 'PATCH') {
      try {
        const title = JSON.parse(body).title

        if (!title) {
          console.log('title is required')
          return errorHandle(res)
        }

        const id = req.url.split('/').at(-1)
        const index = todos.findIndex((todo) => todo.id === id)

        if (index === -1) {
          console.log('todo not found')
          return errorHandle(res)
        }

        const todo = todos[index]
        todo.title = title
        res.writeHead(200, headers)
        res.write(JSON.stringify({ status: 'success', data: todo }))
        res.end()
      } catch (error) {
        console.log(error)
        errorHandle(res, error)
      }
    }
    // ------------ else ------------
    else {
      res.writeHead(404, headers)
      res.write(JSON.stringify({ status: 'false', message: '無此網站路由' }))
      res.end()
    }
  })
}

const server = http.createServer(requestListener)
const PORT = process.env.PORT || 3005

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
