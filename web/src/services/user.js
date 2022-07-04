import {LOGIN, ROUTES, GET_VER_CODE, REGISTER, QUERY_ALL, DELETE, DOSOMETHING} from '@/services/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'
import Global from "../Global";

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  console.log("name:" + name + ", password" + password)
  console.log(LOGIN)
  // return request(LOGIN, METHOD.POST, {
  //   username: name,
  //   password: password
  // })
  return request(LOGIN, METHOD.POST, {
    username: "admin",
    password: "888888"
  })
}

export async function getRoutesConfig() {
  return request(ROUTES, METHOD.GET)
}

export async function getVerCode(userEmail) {
  return request(GET_VER_CODE, METHOD.POST, {
    email: userEmail,
  })
}

export async function detele (id) {
  return request(DELETE, METHOD.POST, {
    id: id,
  })
}

export async function doSomething (title, content) {
  return request(DOSOMETHING, METHOD.POST, {
    userId: Global.userId,
    title: title,
    content: content,
  })
}

export async function forgotPassword(userEmail, password, code) {
  return request(REGISTER, METHOD.POST, {
    userEmail: userEmail,
    password: password,
    code: code,
  })
}

export async function queryAll() {
  return request(QUERY_ALL, METHOD.POST, {
    userId: Global.userId,
  })
}

export async function register(userName, userEmail, password, code) {
  return request(REGISTER, METHOD.POST, {
    userName: userName,
    userEmail: userEmail,
    password: password,
    code: code,
  })
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}
export default {
  login,
  logout,
  getRoutesConfig
}
