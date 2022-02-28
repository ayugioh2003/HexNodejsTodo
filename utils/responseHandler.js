import defaultHeaders from './headers.js'
export default ({
  req,
  res,
  code = 200,
  headers = defaultHeaders,
  data,
  status,
  message,
  errorMessage,
}) => {
  console.log('errorMessage', errorMessage)
  res.writeHead(code, headers)
  res.write(
    JSON.stringify({
      code,
      status,
      message,
      errorMessage,
      data,
    })
  )
  res.end()
}
