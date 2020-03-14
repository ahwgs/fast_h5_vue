/*
 * @Descripttion: 微信api二次封裝
 * @Author: ahwgs
 * @Date: 2020-01-18 19:15:13
 * @LastEditors  : ahwgs
 * @LastEditTime : 2020-01-18 19:15:41
 */

import wx from 'weixin-js-sdk'

const wxJS = {}
/**
 * 初始化微信
 * @param params
 */
wxJS.config = function config(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    wx.config(params)
    wx.ready(resolve)
    wx.error(res => {
      reject(new Error(res.errMsg))
    })
  })
}
/**
 * 判断当前客户端版本是否支持指定JS接口
 * @param params
 */
wxJS.checkJsApi = function checkJsApi(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.checkJsApi(params)
  })
}
/**
 * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
 * @param params
 */
wxJS.onMenuShareTimeline = function onMenuShareTimeline(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = function(res) {
      res.result = 'success'
      resolve(res)
    }
    params.cancel = function() {
      resolve({ result: 'cancel' })
    }
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.onMenuShareTimeline(params)
  })
}
/**
 * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
 * @param params
 */
wxJS.updateAppMessageShareData = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = function(res) {
      res.result = 'success'
      resolve(res)
    }
    params.cancel = function() {
      resolve({ result: 'cancel' })
    }
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.updateAppMessageShareData(params)
  })
}
/**
 * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
 * @param params
 */
wxJS.updateTimelineShareData = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = function(res) {
      res.result = 'success'
      resolve(res)
    }
    params.cancel = function() {
      resolve({ result: 'cancel' })
    }
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.updateTimelineShareData(params)
  })
}
/**
 * 获取“分享给朋友”按钮点击状态及自定义分享内容接口
 * @param params
 */
wxJS.onMenuShareAppMessage = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = function(res) {
      res.result = 'success'
      resolve(res)
    }
    params.cancel = function() {
      resolve({ result: 'cancel' })
    }
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.onMenuShareAppMessage(params)
  })
}
/**
 * 获取“分享到QQ”按钮点击状态及自定义分享内容接口
 * @param params
 */
wxJS.onMenuShareQQ = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = function(res) {
      res.result = 'success'
      resolve(res)
    }
    params.cancel = function() {
      resolve({ result: 'cancel' })
    }
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.onMenuShareQQ(params)
  })
}
/**
 * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
 * @param params
 */
wxJS.onMenuShareWeibo = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = function(res) {
      res.result = 'success'
      resolve(res)
    }
    params.cancel = function() {
      resolve({ result: 'cancel' })
    }
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.onMenuShareWeibo(params)
  })
}
/**
 * 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
 * @param params
 */
wxJS.onMenuShareQZone = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = function(res) {
      res.result = 'success'
      resolve(res)
    }
    params.cancel = function() {
      resolve({ result: 'cancel' })
    }
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.onMenuShareQZone(params)
  })
}

/**
 * 拍照或从手机相册中选图接口
 * @param params
 */
wxJS.chooseImage = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.chooseImage(params)
  })
}

/**
 * 获取本地图片接口（微信新增API）
 * @param params
 */
wxJS.getLocalImgData = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.getLocalImgData(params)
  })
}

/**
 * 预览图片接口
 * @param params
 */
wxJS.previewImage = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.previewImage(params)
  })
}
/**
 * 上传图片接口
 * @param params
 */
wxJS.uploadImage = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.uploadImage(params)
  })
}
/**
 * 下载图片接口
 * @param params
 */
wxJS.downloadImage = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.downloadImage(params)
  })
}
/**
 * 开始录音
 * @param params
 */
wxJS.startRecord = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.startRecord(params)
  })
}
/**
 * 停止录音
 * @param params
 */
wxJS.stopRecord = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.stopRecord(params)
  })
}
/**
 * 监听录音自动停止接口
 * @param params
 */
wxJS.onVoiceRecordEnd = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.complete = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.onVoiceRecordEnd(params)
  })
}
/**
 * 播放语音接口
 * @param params
 */
wxJS.playVoice = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.playVoice(params)
  })
}
/**
 * 暂停播放接口
 * @param params
 */
wxJS.pauseVoice = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.pauseVoice(params)
  })
}
/**
 * 停止播放接口
 * @param params
 */
wxJS.stopVoice = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.stopVoice(params)
  })
}
/**
 * 监听语音播放完毕接口
 * @param params
 */
wxJS.onVoicePlayEnd = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.onVoicePlayEnd(params)
  })
}
/**
 * 上传语音接口
 * @param params
 */
wxJS.uploadVoice = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.uploadVoice(params)
  })
}
/**
 * 下载语音接口
 * @param params
 */
wxJS.downloadVoice = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.downloadVoice(params)
  })
}
/**
 * 识别音频并返回识别结果接口
 * @param params
 */
wxJS.translateVoice = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.translateVoice(params)
  })
}
/**
 * 获取网络状态接口
 * @param params
 */
wxJS.getNetworkType = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.getNetworkType(params)
  })
}
/**
 * 获取地理位置接口
 * @param params
 */
wxJS.getLocation = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.getLocation(params)
  })
}
/**
 * 开启查找周边ibeacon设备接口
 * @param params
 */
wxJS.startSearchBeacons = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.complete = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.startSearchBeacons(params)
  })
}
/**
 * 关闭查找周边ibeacon设备接口
 * @param params
 */
wxJS.stopSearchBeacons = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.complete = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.stopSearchBeacons(params)
  })
}
/**
 * 监听周边ibeacon设备接口
 * @param params
 */
wxJS.onSearchBeacons = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.complete = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.onSearchBeacons(params)
  })
}
/**
 * 调起微信扫一扫接口
 * @param params
 */
wxJS.scanQRCode = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.scanQRCode(params)
  })
}
/**
 * 拉取适用卡券列表并获取用户选择信息
 * @param params
 */
wxJS.chooseCard = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.chooseCard(params)
  })
}
/**
 * 批量添加卡券接口
 * @param params
 */
wxJS.addCard = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.addCard(params)
  })
}
/**
 * 发起一个微信支付请求
 * @param params
 */
wxJS.chooseWXPay = function(params) {
  params = params || {}
  return new Promise((resolve, reject) => {
    params.success = resolve
    params.fail = function(res) {
      reject(new Error(res.errMsg))
    }
    wx.chooseWXPay(params)
  })
}

export default wxJS
