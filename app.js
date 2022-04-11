import fs from 'fs'
import mongoose from 'mongoose'
import Todo from './components/todos/model.js'

// utils
import responseHandler from './utils/responseHandler.js'
import errorHandler from './utils/errorHandler.js'
import headers from './utils/headers.js'

// routes
import todosRoute from './components/todos/index.js'
import todoRoute from './components/todo/index.js'

// connect to mongo
mongoose
  .connect('mongodb://localhost:27017/test')
  .then(() => {
    console.log('Connected to mongodb')
  })
  .catch((err) => {
    console.log(err)
  })

// const todoSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'Title is required'],
//     },
//     // createdAt: {
//     //   type: Date,
//     //   default: Date.now,
//     //   select: false,
//     // }
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//     // collection: todo
//   }
// )
// const Todo = mongoose.model('Todos', todoSchema)

// 新增 1
// const todo = new Todo({ title: 'test2' })
// todo.save().then((doc) => {
//   console.log(doc)
// })
// 新增 2
Todo.create({ title: 'test4' }).then((doc) => {
  console.log(doc)
})

export default (req, res) => {
  req.body = ''
  req.on('data', (chunk) => {
    req.body += chunk
  })

  req.on('end', () => {
    if (req.method == 'OPTIONS') {
      return responseHandler({ res })
    }
    if (req.url === '/' && req.method === 'GET') {
      fs.readFile(
        './pages/index/index.html',
        { encoding: 'utf8', flag: 'r' },
        function (error, data) {
          if (error) {
            console.log('error', error)
            errorHandler({ res, errorMessage: error.message })
          } else {
            res.writeHead(200, { ...headers, 'Content-Type': 'text/html' })
            res.write(data)
            res.end()
          }
        }
      )
      return
      // return responseHandler({ res, data: todosModel.getAll() })
    }

    if (req.url === '/todos') {
      todosRoute(req, res)
      return
    }

    if (req.url.includes('/todos/')) {
      todoRoute(req, res)
      return
    }

    // ------------ else ------------
    return errorHandler({
      res,
      code: 404,
    })
  })
}
