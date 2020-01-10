import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { url, data = null, method = 'get' } = config
  const requesst = new XMLHttpRequest()

  requesst.open(method.toUpperCase(), url, true)
  requesst.send(data)
}
