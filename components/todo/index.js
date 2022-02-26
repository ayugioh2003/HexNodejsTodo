// utils
import responseHandler from '../../utils/responseHandler.js'
import errorHandle from '../../errorHandle.js'

export default (req, res) => {
  // todo delete
  if (req.method === 'DELETE') {
    try {
      const id = req.url.split('/').at(-1)
      const index = req.todos.findIndex((todo) => todo.id === id)

      if (index === -1) {
        console.log('todo not found')
        return errorHandle(res)
      }

      req.todos.splice(index, 1)
      return responseHandler({ res, data: req.todos })
    } catch (error) {
      errorHandle(res, error)
    }
  }
  // todo patch
  if (req.method === 'PATCH') {
    try {
      const title = JSON.parse(req.body).title

      if (!title) {
        console.log('title is required')
        return errorHandle(res)
      }

      const id = req.url.split('/').at(-1)
      const index = req.todos.findIndex((todo) => todo.id === id)

      if (index === -1) {
        console.log('todo not found')
        return errorHandle(res)
      }

      const todo = req.todos[index]
      todo.title = title

      return responseHandler({ res, data: todo })
    } catch (error) {
      errorHandle(res, error)
    }
  }
}
