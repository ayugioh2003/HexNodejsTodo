import http from 'http'
import responseHandler from './utils/responseHandler.js'
import errorHandler from './utils/errorHandler.js'
import todosModel from './components/todos/model.js'

function app(req, res) {
  req.body = ''
  req.on('data', (data) => {
    req.body += data
  })
  req.on('end', () => {
    if (req.url === '/') {
      responseHandler({ res, data: 'Hello World' })
      return
    }

    if (req.method === 'OPTIONS') {
      responseHandler({ res })
      return
    }

    // todos
    if (req.url === '/todos') {
      if (req.method === 'GET') {
        responseHandler({
          res,
          data: todosModel.getAll(),
        })
        return
      }
      if (req.method === 'POST') {
        console.log('req.body', req.body)
        try {
          const { title } = JSON.parse(req.body)

          if (!title) {
            throw new Error('title is required')
          }

          responseHandler({
            res,
            data: todosModel.add({ title }),
          })
        } catch (e) {
          console.log('error', e)
          errorHandler({
            res,
            code: 400,
            errorMessage: e.toString() || e.messsage,
          })
        }
        return
      }
      if (req.method === 'DELETE') {
        try {
          responseHandler({
            res,
            data: todosModel.deleteAll(),
          })
        } catch (e) {
          errorHandler({
            res,
            code: 400,
            errorMessage: e.toString() || e.messsage,
          })
        }
        return
      }
    }

    // todo
    if (req.url.startsWith('/todos/')) {
      if (req.method === 'PATCH') {
        try {
          const { title } = JSON.parse(req.body)
          if (!title) {
            throw new Error('title is required')
          }

          const id = req.url.split('/').at(-1)
          if (!id) {
            throw new Error('id is required')
          }

          const todo = todosModel.getById({ id })
          if (!todo.id) {
            throw new Error('todo not found')
          }

          responseHandler({
            res,
            data: todosModel.update({ id, title }),
          })
        } catch (e) {
          console.log('error', e)
          errorHandler({
            res,
            code: 400,
            errorMessage: e.toString() || e.messsage,
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

          const todo = todosModel.getById({ id })
          if (!todo.id) {
            throw new Error('todo not found')
          }

          responseHandler({
            res,
            message: '成功刪除',
            data: todosModel.deleteById({ id }),
          })
        } catch (e) {
          console.log('error', e)
          errorHandler({
            res,
            code: 400,
            errorMessage: e.toString() || e.messsage,
          })
        }
        return
      }
    }

    errorHandler({ res, code: 404 })
    return
  })
}

const server = http.createServer(app)

const PORT = process.env.PORT || 3005
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
