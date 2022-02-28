// utils
import responseHandler from '../../utils/responseHandler.js'
import errorHandler from '../../utils/errorHandler.js'

// models
import todosModel from '../todos/model.js'

export default async (req, res) => {
  // todo delete
  if (req.method === 'DELETE') {
    try {
      const id = req.url.split('/').at(-1)
      const index = await todosModel.getIndexById(id)

      if (index === -1) {
        return errorHandler({ res, message: 'todo not found' })
      }

      await todosModel.deleteById(id)
      const data = await todosModel.getAll()
      return responseHandler({ res, data })
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
      const index = await todosModel.getIndexById(id)

      if (index === -1) {
        return errorHandler({ res, message: 'todo not found' })
      }

      const todo = await todosModel.updateById({ id, title })
      console.log('todo', todo)

      return responseHandler({ res, data: todo })
    } catch (error) {
      errorHandler({ res, code: 400, errorMessage: error.message })
    }
  }
}
