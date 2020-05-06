/**
 * 获取token
 * @returns {any | string}
 */
export const getToken = () =>
  JSON.parse(localStorage.getItem('USER_TOKEN')) || ''

/**
 * 设置token
 * @param token
 */
export const setToken = token => {
  localStorage.setItem('USER_TOKEN', JSON.stringify(token))
}
