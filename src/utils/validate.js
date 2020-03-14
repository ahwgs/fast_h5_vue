/**
 * @Description: 校验工具类
 * @author ahwgs
 * @date 2019/11/8
 */

/**
 * @param (String) path
 * @returns {boolean}
 */
export const isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
