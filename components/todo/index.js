// utils
import responseHandler from '../../utils/responseHandler.js'
import errorHandler from '../../utils/errorHandler.js'

export default (req, res) => {
  // todo delete
  if (req.method === 'DELETE') {
    try {
      const id = req.url.split('/').at(-1)
      const index = req.todos.findIndex((todo) => todo.id === id)

      if (index === -1) {
        return errorHandler({ res, message: 'todo not found' })
      }

      req.todos.splice(index, 1)
      return responseHandler({ res, data: req.todos })
    } catch (error) {
      errorHandler({ res, code: 200, errorMessage: error.message })
    }
  }
  // todo patch
  if (req.method === 'PATCH') {
    try {
      const title = JSON.parse(req.body).title

      if (!title) {
        return errorHandler({ res, message: 'title is required' })
      }

      const id = req.url.split('/').at(-1)
      const index = req.todos.findIndex((todo) => todo.id === id)

      if (index === -1) {
        return errorHandler({ res, message: 'todo not found' })
      }

      const todo = req.todos[index]
      todo.title = title

      return responseHandler({ res, data: todo })
    } catch (error) {
      errorHandler({ res, code: 200, errorMessage: error.message })
    }
  }
}
