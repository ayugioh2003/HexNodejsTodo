// config
import responseHandler from '../../utils/responseHandler.js'
import errorHandler from '../../utils/errorHandler.js'

// models
import Todo from './model.js'

export default async (req, res) => {
  // todos get
  if (req.method === 'GET') {
    const data = await Todo.find()
    return responseHandler({ res, data })
  }
  // todo post
  if (req.method === 'POST') {
    try {
      const title = JSON.parse(req.body).title

      if (!title) {
        return errorHandler({ res, code: 400, message: 'title is required' })
      }

      const todo = await Todo.create({ title })

      return responseHandler({ res, data: todo })
    } catch (error) {
      return errorHandler({ res, code: 400, errorMessage: error.message })
    }
  }
  // todo delete
  if (req.method === 'DELETE') {
    try {
      const todosRes = await Todo.deleteMany()
      const todos = await Todo.find()
      return responseHandler({ res, data: todos })
    } catch (error) {
      return errorHandler({ res, code: 400, errorMessage: error.message })
    }
  }
}
