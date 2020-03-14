/*
 * @Descripttion: 微信公共方法
 * @Author: ahwgs
 * @Date: 2020-01-18 19:15:13
 * @LastEditors  : ahwgs
 * @LastEditTime : 2020-01-18 19:15:41
 */

import wxJS from './wx-sdk.js'
import browser from './browser'

import { getWxJSDKCode } from '@/service/user'

const { weiXin } = browser
import defaultSettings from '../setting'
const { appId } = defaultSettings
/**
 * @name 微信初始化sdk
 * @param {array} [jsApiList=[]]
 */
export const initWxJSDK = async(jsApiList = []) => {
  if (!weiXin) return
  const url = window.wx_ios_url || window.location.href
  const res = await getWxJSDKCode({
    url
  })
  await wxJS.config({
    appId,
    ...res,
    jsApiList
  })
}
/**
 * @name 初始化微信分享
 * @param {object} {title, desc, link, imgUrl}
 */
export const initWxShare = params => {
  wxJS.updateAppMessageShareData(params)
  wxJS.updateTimelineShareData(params)
}

/**
 * @name 微信扫码
 */
export const scanWxQRCode = async callBack => {
  const { resultStr } = await wxJS.scanQRCode({
    needResult: 1,
    scanType: ['barCode']
  })
  const serial = resultStr.split(',')
  const codeNum = serial[serial.length - 1]
  callBack(codeNum)
}
/**
 * @name 微信支付
 */
export const wxPay = async(payload, callBack) => {
  const { timeStamp: timestamp, ...other } = payload
  await wxJS.chooseWXPay({
    ...other,
    timestamp
  })
  callBack()
}
/**
 * @name 微信图片预览
 */
export const previewImage = (urls, index = 0) => {
  wxJS.previewImage({
    current: urls[index], // 当前显示图片的http链接
    urls // 需要预览的图片http链接列表
  })
}
