import { assert } from 'chai'
import request from 'supertest'

import app from '../app.js'

let tempTodo = {}

// describe('Array', function () {
//   describe('just test example #indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       assert.equal([1, 2, 3].indexOf(4), -1)
//     })
//   })
// })

describe('API test', function () {
  describe('GET /todos', function () {
    it('should return todos array', function (done) {
      request(app)
        .get('/todos')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          assert.typeOf(res.body.data, 'array')
          done()
          if (err) throw err
        })
    })

    it('should have id and title', function (done) {
      request(app)
        .get('/todos')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          assert.exists(res.body.data[0]._id, '_id not exist')
          assert.exists(res.body.data[0].title, 'title not exist')
          done()
          if (err) throw err
        })
    })
  })

  describe('POST /todos', function () {
    it('should return todo object', function (done) {
      const data = { title: 'test' }

      request(app)
        .post('/todos')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          tempTodo = res.body.data
          assert.typeOf(res.body.data, 'object')
          assert.exists(res.body.data._id, '_id not exist')
          assert.exists(res.body.data.title, 'title not exist')
          done()
          if (err) throw err
        })
    })
  })

  describe('PATCH /todos/_id', function () {
    it('should return todo object', function (done) {
      const data = { ...tempTodo, title: 'patch it 123' }

      request(app)
        .patch(`/todos/${data._id}`)
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          assert.typeOf(res.body.data, 'object')
          assert.equal(res.body.data._id, data._id)
          assert.equal(res.body.data.title, data.title)
          done()
          if (err) throw err
        })
    })
  })

  describe('DELETE /todos/_id', function () {
    it('should return deleted todo', function (done) {
      const data = tempTodo

      request(app)
        .delete(`/todos/${data._id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          tempTodo = res.body.data
          assert.typeOf(res.body.data, 'object')
          assert.exists(res.body.data._id, '_id not exist')
          assert.exists(res.body.data.title, 'title not exist')
          done()
          if (err) throw err
        })
    })
  })

  describe('DELETE /todos', function () {
    it('should return empty array', function (done) {
      request(app)
        .delete(`/todos`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          assert.typeOf(res.body.data, 'array')
          assert.isEmpty(res.body.data)
          done()
          if (err) throw err
        })
    })
  })
})
