//跨域代理前缀
// const API_PROXY_PREFIX='http://106.54.191.30:80/api'
const API_PROXY_PREFIX='https://81.70.35.148/api'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL
// const REAL_URL = process.env.VUE_APP_API_REAL_URL
// console.log(BASE_URL)
module.exports = {
  LOGIN: `${BASE_URL}/loginName/`,
  // LOGIN: `${process.env.VUE_APP_API_BASE_URL}/login`,
  ROUTES: `${BASE_URL}/routes`,
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,
  GET_VER_CODE: `${BASE_URL}/getVerCode/`,
  REGISTER: `${BASE_URL}/register/`,
  FORGOT_PASSWORD: `${BASE_URL}/forgetPassword/`,
  QUERY_ALL: `${BASE_URL}/queryAll/`,
  DELETE: `${BASE_URL}/delete/`,
  DOSOMETHING: `${BASE_URL}/uploadText/`,
  QUERY_USER: `${BASE_URL}/queryUser/`,
  UPDATE_USER: `${BASE_URL}/updateUser/`,
  DELETE_USER: `${BASE_URL}/deleteUser/`,
}
