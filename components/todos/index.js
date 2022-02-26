import { v4 as uuidv4 } from 'uuid'

// config
import headers from '../../config/headers.js'
import errorHandle from '../../errorHandle.js'

export default (req, res) => {
  // todos get
  if (req.url === '/todos' && req.method === 'GET') {
    res.writeHead(200, headers)
    res.write(JSON.stringify({ status: 'success', data: req.todos }))
    return res.end()
  }
  // todo post
  else if (req.url === '/todos' && req.method === 'POST') {
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
      res.writeHead(200, headers)
      res.write(JSON.stringify({ status: 'success', data: todo }))
      return res.end()
    } catch (error) {
      return errorHandle(res, error)
    }
  }
  // todo delete
  else if (req.url === '/todos' && req.method === 'DELETE') {
    try {
      req.todos.length = 0
      res.writeHead(200, headers)
      res.write(JSON.stringify({ status: 'success', data: req.todos }))
      res.end()
    } catch (error) {
      console.log(error)
      return errorHandle(res, error)
    }
  }
}
