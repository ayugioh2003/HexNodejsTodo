import headers from './headers.js'

export default ({
  req,
  res, // 必填
  code = 200,
  status = 'success',
  data, // 必填
  message,
  errorMessage,
}) => {
  res.writeHead(code, headers)
  res.write(JSON.stringify({ code, status, data, message, errorMessage }))
  return res.end()
}
