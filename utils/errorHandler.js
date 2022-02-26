import responseHandler from './responseHandler.js'

function errorHandler(props) {
  const payload = {
    ...props,
    code: 400,
    message: props.message || '欄位未填寫正確，或無此 todo id',
    status: 'false',
  }
  return responseHandler(payload)
}

export default errorHandler
