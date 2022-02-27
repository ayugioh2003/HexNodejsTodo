// utils
import responseHandler from '../../utils/responseHandler.js'
import errorHandler from '../../utils/errorHandler.js'

export default (req, res) => {
  // todo delete
  if (req.method === 'DELETE') {
    try {
      const id = req.url.split('/').at(-1)
      const index = req.todosModel.getIndexById(id)

      if (index === -1) {
        return errorHandler({ res, message: 'todo not found' })
      }

      req.todosModel.deleteById(id)
      return responseHandler({ res, data: req.todosModel.getAll() })
    } catch (error) {
      errorHandler({ res, code: 400, errorMessage: error.message })
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
      const index = req.todosModel.getIndexById(id)

      if (index === -1) {
        return errorHandler({ res, message: 'todo not found' })
      }

      const todo = req.todosModel.updateById({ id, title })

      return responseHandler({ res, data: todo })
    } catch (error) {
      errorHandler({ res, code: 400, errorMessage: error.message })
    }
  }
}
