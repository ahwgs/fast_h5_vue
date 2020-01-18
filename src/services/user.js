import request from '@/utils/request'

export const logout = () => {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}

export const resetToken = () => {
    return request({
        url: '/user/resetToken',
        method: 'get'
    })
}

export const getUserInfo = () => {
    return request({
        url: '/user/getInfo',
        method: 'get'
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
