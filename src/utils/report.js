/*
 * 上报组件
 * @Author: ahwgs
 * @Date: 2020-05-06 21:05:05
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-06 21:06:56
 */

import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

class Report {
  // 单例模式
  static getInstance(Vue, options) {
    if (!this.instance) {
      this.instance = new Report(Vue, options)
      this.instance.install()
      this.instance.registerGlobalError()
    }
    return this.instance
  }

  constructor(Vue, options) {
    this.Vue = Vue
    this.options = options
  }

  // 初始化
  install() {
    Sentry.init({
      dsn: this.options.dsn,
      integrations: [
        new Integrations.Vue({ Vue: this.Vue, attachProps: true })
      ],
      release: this.options.release,
      environment: this.options.environment
    })
  }

  /**
     * 注册全局错误处理
     */
  registerGlobalError() {
    // 全局监控资源加载错误
    window.addEventListener(
      'error',
      event => {
        // 过滤 js error
        const target = event.target || event.srcElement
        const isElementTarget =
                    target instanceof HTMLScriptElement ||
                    target instanceof HTMLLinkElement ||
                    target instanceof HTMLImageElement
        if (!isElementTarget) {
          return false
        }
        // 上报资源地址
        const url = target.src || target.href

        this.log({
          error: new Error(`ResourceLoadError: ${url}`),
          type: 'resource load'
        })
      },
      true
    )
  }
  /**
     * 主动上报
     */
  log(info) {
    Sentry.withScope(scope => {
      Object.keys(info).forEach(key => {
        if (key !== 'error') {
          scope.setExtra(key, info[key])
        }
      })
      Sentry.captureException(info.error || new Error(''))
    })
  }
}

export default Report
