import http from 'http'

// config
import responseHandler from './utils/responseHandler.js'
import errorHandler from './utils/errorHandler.js'

// routers
import todosRoute from './components/todos/index.js'
import todoRoute from './components/todo/index.js'

// models
import TodosModel from './components/todos/model.js'
const todosModel = new TodosModel()

const requestListener = (req, res) => {
  req.todosModel = todosModel
  req.body = ''
  req.on('data', (chunk) => {
    req.body += chunk
  })

  req.on('end', () => {
    if (req.method == 'OPTIONS') {
      return responseHandler({ res, data: req.todos })
    }
    if (req.url === '/' && req.method === 'GET') {
      return responseHandler({ res, data: req.todos })
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
    return errorHandler({
      res,
      code: 404,
    })
  })
}

const server = http.createServer(requestListener)
const PORT = process.env.PORT || 3005

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
