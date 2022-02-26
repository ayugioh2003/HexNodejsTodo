import headers from './headers.js'

export default ({
  req,
  res, // 必填
  code = 200,
  status = 'success',
  data, // 必填
  message,
}) => {
  res.writeHead(code, headers)
  res.write(JSON.stringify({ status, data, message }))
  return res.end()
}
