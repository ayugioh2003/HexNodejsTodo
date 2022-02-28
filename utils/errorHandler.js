import responseHandler from './responseHandler.js'

const codeMessageList = {
  400: 'Bad Request',
  404: 'Not Found',
}
export default (payload) => {
  return responseHandler({
    ...payload,
    status: false,
    message: payload.message || codeMessageList[payload.code],
  })
}
