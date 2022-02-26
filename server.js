import http from 'http'

// config
import headers from './config/headers.js'
import errorHandle from './errorHandle.js'

// routers
import todosRoute from './components/todos/index.js'
import todoRoute from './components/todo/index.js'

// models
const todos = [
  {
    id: '0fc88620-1a44-4654-b38c-7f0f59aca2af',
    title: '早上起來刷刷牙',
  },
]

const requestListener = (req, res) => {
  req.todos = todos
  req.body = ''
  req.on('data', (chunk) => {
    req.body += chunk
  })

  req.on('end', () => {
    try {
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

      if (req.url === '/todos') {
        todosRoute(req, res)
        return
      }

      if (req.url.includes('/todos/')) {
        todoRoute(req, res)
        return
      }

      // ------------ else ------------
      else {
        res.writeHead(404, headers)
        res.write(JSON.stringify({ status: 'false', message: '無此網站路由' }))
        res.end()
      }
    } catch (error) {
      console.log('end error', error)
    }
  })
}

const server = http.createServer(requestListener)
const PORT = process.env.PORT || 3005

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
