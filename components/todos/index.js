import { v4 as uuidv4 } from 'uuid'

// config
import responseHandler from '../../utils/responseHandler.js'
import errorHandle from '../../errorHandle.js'

export default (req, res) => {
  // todos get
  if (req.url === '/todos' && req.method === 'GET') {
    return responseHandler({ res, data: req.todos })
  }
  // todo post
  if (req.url === '/todos' && req.method === 'POST') {
    try {
      const title = JSON.parse(req.body).title

      if (!title) {
        console.log('title is required')
        return errorHandle(res)
      }

      const todo = {
        id: uuidv4(),
        title,
      }
      req.todos.push(todo)

      return responseHandler({ res, data: todo })
    } catch (error) {
      return errorHandle(res, error)
    }
  }
  // todo delete
  else if (req.url === '/todos' && req.method === 'DELETE') {
    try {
      req.todos.length = 0
      return responseHandler({ res, data: req.todos })
    } catch (error) {
      console.log(error)
      return errorHandle(res, error)
    }
  }
}
