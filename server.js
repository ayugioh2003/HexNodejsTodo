import http from 'http'
import app from './app.js'

const server = http.createServer(app)
const PORT = process.env.PORT || 3005

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
