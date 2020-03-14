/**
 * @Description: 按需引入vant
 * @author ahwgs
 * @date 2019/11/8
 */

// 需要全局vant的组件在这里添加
import Vue from 'vue'

// eslint-disable-next-line prettier/prettier
import { Toast, Dialog, Notify, ImagePreview } from 'vant'

Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
Vue.prototype.$notify = Notify
Vue.prototype.$imagePreview = ImagePreview
