import { v4 as uuidv4 } from 'uuid'

// config
import responseHandler from '../../utils/responseHandler.js'
import errorHandler from '../../utils/errorHandler.js'

export default (req, res) => {
  // todos get
  if (req.method === 'GET') {
    return responseHandler({ res, data: req.todos })
  }
  // todo post
  if (req.method === 'POST') {
    try {
      const title = JSON.parse(req.body).title

      if (!title) {
        console.log('title is required')
        return errorHandler({ res })
      }

      const todo = {
        id: uuidv4(),
        title,
      }
      req.todos.push(todo)

      return responseHandler({ res, data: todo })
    } catch (error) {
      return errorHandler({ res })
    }
  }
  // todo delete
  if (req.method === 'DELETE') {
    try {
      req.todos.length = 0
      return responseHandler({ res, data: req.todos })
    } catch (error) {
      console.log(error)
      return errorHandle({ res })
    }
  }
}
