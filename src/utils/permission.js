/**
 * @Description: 路由拦截 权限校验
 * @author ahwgs
 * @date 2019/11/8
 */

import router from '@/router'
import store from '@/store'
import { Notify } from 'vant'

import defaultSetting from '../setting'

const { topProgress } = defaultSetting
import NProgress from 'nprogress' // progress bar
import '@/assets/less/nprogress.less'
import { setDocumentTitle } from '@/utils/dom-util'
import { getToken } from '@/utils/storage'

if (topProgress) {
  NProgress.configure({ showSpinner: false }) // NProgress Configuration
}

const whiteList = ['login', 'register'] // 路由白名单
const defaultPath = '/'

router.beforeEach(async(to, from, next) => {
  if (topProgress) NProgress.start() // start progress bar
  // 设置页面标题
  setDocumentTitle(to.meta)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/user/login') {
      // 已经登录，跳转到首页
      next({ path: defaultPath })
      if (topProgress) NProgress.done()
    } else {
      // 获取用户信息
      const hasGetUserInfo =
                store.getters.userData && store.getters.userData.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getUser')
          next()
        } catch (error) {
          // 清除用户信息，退出登录，跳转登录页
          store.dispatch('user/logout')
          Notify({
            type: 'danger',
            message: error || 'Has Error'
          })
          next(`/user/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.includes(to.name)) {
      // 白名单中，无需验证
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/user/login?redirect=${to.path}`)
      if (topProgress) NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})
router.afterEach(() => {
  if (topProgress) NProgress.done() // finish progress bar
})
