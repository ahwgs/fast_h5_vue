import request from '@/utils/request'

export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'POST'
  })
}

export const resetToken = () => {
  return request({
    url: '/user/resetToken',
    method: 'GET'
  })
}

export const getUserInfo = () => {
  console.log('getUserInfo')
  return request({
    url: '/user/getInfo',
    method: 'GET'
  })
}

// 获取微信授权
export const getWxJSDKCode = params => {
  return request({
    url: '/user/getWxCode',
    method: 'GET',
    params
  })
}
