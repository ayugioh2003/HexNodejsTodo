import defaultHeaders from './headers.js'

const codeMessageList = {
  200: 'request success',
  400: 'bad request',
  404: 'not found',
  500: 'server error',
}

export default ({
  req,
  res,
  code = 200,
  headers = defaultHeaders,
  data,
  message,
  errorMessage,
}) => {
  res.writeHead(code, headers)
  res.write(JSON.stringify({ code, data, message, errorMessage }))
  res.end()
}
