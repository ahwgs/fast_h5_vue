/**
 * @Description: 导入功能
 * @author ahwgs
 * @date 2019/11/8
 */
import Vue from 'vue'
import 'lib-flexible'
import FastClick from 'fastclick'
import defaultSettings from '../setting'
import * as filters from '@/filters' // global filters
const { NODE_ENV } = process.env
import '@/core/component_use'
import '@/icons'
import SvgIcon from '@/components/SvgIcon' // 引入svgIcon组件
import '@/assets/less/common.less' // 引入公共样式

import '@/utils/permission' // 权限校验

import { mockXHR } from '../../mock'
import Report from '../utils/report'

const IS_DEV = NODE_ENV !== 'production'
const { enableMock, showVconsole, enableSentry, SentryDSN } = defaultSettings
if (IS_DEV && enableMock) {
  mockXHR()
}

if (IS_DEV && enableSentry) {
  const sentry = Report.getInstance(Vue, {
    dsn: SentryDSN,
    release: __VERSION__, // from webpack DefinePlugin
    environment: NODE_ENV
  })

  window.$sentry = sentry

  // 全局监控 Vue errorHandler
  Vue.config.errorHandler = (error, vm, info) => {
    window.$sentry.log({
      error,
      type: 'vue errorHandler',
      vm,
      info
    })
  }
}

// 注册svgIcon组件
Vue.component('svg-icon', SvgIcon)

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 解决移动端点击300ms延时
FastClick.attach(document.body)

if (IS_DEV && showVconsole) {
  const VConsole = require('vconsole')
  console.log('vconsole install success')
  // eslint-disable-next-line
    const v_console = new VConsole()
}
