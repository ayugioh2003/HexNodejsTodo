// utils
import responseHandler from '../../utils/responseHandler.js'
import errorHandler from '../../utils/errorHandler.js'

// models
import Todo from '../todos/model.js'

export default async (req, res) => {
  // todo delete
  if (req.method === 'DELETE') {
    try {
      const id = req.url.split('/').at(-1)
      const data = await Todo.findByIdAndDelete(id)

      if (!id || !data) {
        return errorHandler({
          res,
          code: 404,
          message: 'Todo not found'
        })
      }
      // Todo.deleteOne({ _id: id })
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
      const todo = await Todo.findByIdAndUpdate(id, { title }, { returnDocument: 'after'})

      if (!id || !todo) {
        return errorHandler({
          res,
          code: 404,
          message: 'Todo not found'
        })
      }

      return responseHandler({ res, data: todo })
    } catch (error) {
      errorHandler({ res, code: 400, errorMessage: error.message })
    }
  }
}
