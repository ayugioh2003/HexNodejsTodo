import { v4 as uuidv4 } from 'uuid'

// config
import responseHandler from '../../utils/responseHandler.js'
import errorHandler from '../../utils/errorHandler.js'

export default (req, res) => {
  // todos get
  if (req.method === 'GET') {
    return responseHandler({ res, data: req.todosModel.getAll() })
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
      req.todosModel.add(todo)

      return responseHandler({ res, data: todo })
    } catch (error) {
      return errorHandler({ res, code: 400, errorMessage: error.message })
    }
  }
  // todo delete
  if (req.method === 'DELETE') {
    try {
      req.todosModel.deleteAll()
      return responseHandler({ res, data: req.todosModel.getAll() })
    } catch (error) {
      return errorHandle({ res, code: 400, errorMessage: error.message })
    }
  }
}
