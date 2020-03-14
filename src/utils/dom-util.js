import defaultSetting from '../setting'
const { title } = defaultSetting

export const appTitle = title || 'FastH5'

export const setDocumentTitle = function(meta) {
  const { title } = meta
  document.title = !meta || !meta.title ? appTitle : `${title}-${appTitle}`
  const ua = navigator.userAgent
  // eslint-disable-next-line no-useless-escape
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function() {
      setTimeout(function() {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}
