import { v4 as uuidv4 } from 'uuid'

// config
import responseHandler from '../../utils/responseHandler.js'
import errorHandler from '../../utils/errorHandler.js'

// models
import todosModel from './model.js'

export default async (req, res) => {
  // todos get
  if (req.method === 'GET') {
    const data = await todosModel.getAll()
    return responseHandler({ res, data })
  }
  // todo post
  if (req.method === 'POST') {
    try {
      const title = JSON.parse(req.body).title

      if (!title) {
        return errorHandler({ res, code: 400, message: 'title is required' })
      }

      const todo = {
        id: uuidv4(),
        title,
      }
      todosModel.add(todo)

      return responseHandler({ res, data: todo })
    } catch (error) {
      return errorHandler({ res, code: 400, errorMessage: error.message })
    }
  }
  // todo delete
  if (req.method === 'DELETE') {
    try {
      await todosModel.deleteAll()
      const data = await todosModel.getAll()
      return responseHandler({ res, data })
    } catch (error) {
      return errorHandle({ res, code: 400, errorMessage: error.message })
    }
  }
}
