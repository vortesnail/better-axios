import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  // 接着通过 extend 方法把 context 中的原型方法和实例方法全部拷贝到 instance 上
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
