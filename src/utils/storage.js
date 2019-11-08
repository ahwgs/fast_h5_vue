/**
 * 获取token
 * @returns {any | string}
 */
export const getToken = () =>
  JSON.parse(sessionStorage.getItem("USER_TOKEN")) || "";

/**
 * 设置token
 * @param token
 */
export const setToken = token => {
  sessionStorage.setItem("USER_TOKEN", JSON.stringify(token));
};
