import responseHandler from './responseHandler.js'

const errorCodes = {
  400: '欄位未填寫正確，或無此 todo id',
  404: '無此網站路由',
}

function errorHandler(props) {
  console.log('props', props)
  const payload = {
    ...props,
    code: props.code || 400,
    message: props.message || errorCodes[props.code] || '系統錯誤',
    status: 'false',
  }
  return responseHandler(payload)
}

export default errorHandler
