import axios from 'axios'
import { Dialog, Toast } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/storage'
import { HTTP_RESP_CODE } from '@/constant'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

const errorReport = error => {
  console.log('errorReport', error)
  const { config, data } = error
  const { url } = config
  if (window.$sentry) {
    const errorInfo = {
      error: typeof error === 'string' ? new Error(error) : error,
      type: 'request',
      requestUrl: url,
      requestOptions: JSON.stringify(config)
    }
    if (data) {
      errorInfo.response = JSON.stringify(data)
    }

    window.$sentry.log && window.$sentry.log(errorInfo)
  }
}

const responseLog = response => {
  if (process.env.NODE_ENV === 'development') {
    const randomColor = `rgba(${Math.round(
      Math.random() * 255
    )},${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255
    )})`
    console.log(
      '%c┍------------------------------------------------------------------┑',
      `color:${randomColor};`
    )
    console.log('| 请求地址：', response.config.url)
    console.log(
      '| 请求参数：',
      response.config.data ? JSON.parse(response.config.data) : {}
    )
    console.log('| 返回数据：', response.data)
    console.log(
      '%c┕------------------------------------------------------------------┙',
      `color:${randomColor};`
    )
  }
}

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    responseLog(response)
    const res = response.data

    if (res.code !== HTTP_RESP_CODE.SUCCESS) {
      // 错误提示
      if (res.code === HTTP_RESP_CODE.ERROR) {
        Toast.fail(res.message || '请求出错')
      }
      // 警告提示
      if (res.code === HTTP_RESP_CODE.WARN) {
        Dialog.alert({
          title: '重要提醒',
          message: res.message
        }).then(() => {})
      }
      // token 过期
      if (res.code === HTTP_RESP_CODE.ACCOUNT_RESET_TOKEN) {
        Dialog.confirm({
          title: '重要提醒',
          message: '您的账户登录已过期，是否重新登录'
        })
          .then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
          .catch(() => {
            store.dispatch('user/logout').then(() => {})
          })
      }
      errorReport(response)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    errorReport(error)
    console.log('err' + error) // for debug
    Toast.fail(error.message || '请求出错')
    return Promise.reject(error)
  }
)

export default service
