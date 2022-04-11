import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   select: false,
    // }
  },
  {
    versionKey: false,
    timestamps: true,
    // collection: todo
  }
)

const Todo = mongoose.model('Todos', todoSchema)

export default Todo