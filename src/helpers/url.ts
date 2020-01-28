import { isDate, isPlainObject } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  // 遍历 params 对象的 key 值数组
  Object.keys(params).forEach(key => {
    const val = params[key]
    // params = { key: null | undefined }
    if (val === null || typeof val === 'undefined') {
      return
    }
    // 其它情况
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 去除 #hash
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 判断是否 url 已经有参数的情况
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrgin = resolveURL(requestURL)
  return parsedOrgin.protocol === currentOrigin.protocol && parsedOrgin.host === currentOrigin.host
}

const urlPasingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlPasingNode.setAttribute('href', url)
  const { protocol, host } = urlPasingNode

  return {
    protocol,
    host
  }
}
