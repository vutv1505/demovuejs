import store from '../store/index'
import axios from 'axios'
import https from 'https'
import qs from 'qs'
import miniToastr from 'mini-toastr'
import apiUrl from './apiUrl'
//
// axios.interceptors.request.use(
//   config => {
//     config.metadata = { startTime: new Date() }
//     if (store.state.common.trackId) {
//       config.headers['X-Track-Id'] = store.state.common.trackId
//     }
//     const agent = new https.Agent({
//       rejectUnauthorized: false
//     })
//     config.httpsAgent = agent
//     config.withCredentials = true
//     config.maxRedirects = 0
//     config.timeout = 120000
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
//
// axios.interceptors.response.use(
//   response => {
//     const took = new Date() - response.config.metadata.startTime
//     const method = response.config.method.toUpperCase()
//     const path = response.config.url.replace(
//       process.env.VUE_APP_API_BASE_URL,
//       ''
//     )
//     const message = `${method} ${path}, status: ${
//       response.status
//     }, took: ${took}ms`
//     if (response.status > 300) {
//       console.error(message)
//     } else {
//       console.log(message)
//     }
//     return response
//   },
//   error => {
//     if (error.response && error.response.status === 403) {
//       return Promise.reject('権限がありません')
//     }
//     if (
//       process.env.VUE_APP_SAML_AUTH === 'true' &&
//       error.message === 'Network Error'
//     ) {
//       axios
//         .create()
//         .get(apiUrl.API0546)
//         .catch(e => {
//           if (e.response.status === 401) {
//             window.location.href = process.env.VUE_APP_API_BASE_URL + '/logout'
//           }
//         })
//     }
//     return Promise.reject(error)
//   }
// )
//
// /**
//  * 共通処理系クラス
//  */
export default {
  /**
   * API(POST)実行処理 ※同期処理
   * APIの結果を引数にcallback関数を実行し、その戻り値を返却する
   */
  async postResData(url, data, callback) {
    let ret = await axios
      .post(url, data)
      .then(async response => {
        return callback(response.data)
      })
      .catch(response => {
        // エラー共通処理
        return response
      })
    return ret
  },
  async post(url, data, callback) {
    let ret = await this.postResData(url, data, response => {
      return callback(response)
    })
    return ret
  },
  async getResData(url, data, callback) {
    let ret = await axios
      .get(url, data)
      .then(async response => {
        // await store.dispatch('common/setResultCode', response.data.code)
        if (response.data.code < 0) {
          // router.push('/Error')
        }
        if (response.data.errors) {
          // await store.dispatch('common/setErrors', response.data.errors)
        } else {
          return callback(response.data)
        }
      })
      .catch(response => {
        // エラー共通処理
        // Error(response.Error)
      })
    return ret
  },
  async get(url, data, callback) {
    let ret = await this.getResData(url, data, d => {
      return callback(d.result)
    })
    return ret
  },
  async deleteResData(url, data, callback) {
    let ret = await axios
      .delete(url)
      .then(async response => {
        // await store.dispatch('common/setResultCode', response.data.code)
        if (response.data.code < 0) {
          // router.push('/Error')
        }
        if (response.data.errors) {
          // await store.dispatch('common/setErrors', response.data.errors)
        } else {
          return callback(response.data)
        }
      })
      .catch(response => {
        // エラー共通処理
        // Error(response.Error)
      })
    return ret
  },
  async delete(url, data, callback) {
    let ret = await this.deleteResData(url, data, d => {
      return callback(d.result)
    })
    return ret
  },

  async postAsync(url, data, config) {
    const res = axios.post(url, data, config)
    res.then(({ data }) => {
      if (data.warning) {
        miniToastr.warn(data.warning.warningMessage, '警告')
      }
    })
    return res
  },
  getAsync(url, config) {
    const res = axios.get(url, {
      paramsSerializer: p =>
        qs.stringify(p, { arrayFormat: 'repeat', skipNulls: true }),
      ...config
    })
    res.then(({ data }) => {
      if (data.warning) {
        miniToastr.warn(data.warning.warningMessage, '警告')
      }
    })
    return res
  },
  deleteAsync(url, data, config) {
    const res = axios.delete(url, { ...config, data })
    res.then(({ data }) => {
      if (data.warning) {
        miniToastr.warn(data.warning.warningMessage, '警告')
      }
    })
    return res
  },
  putAsync(url, data, config) {
    const res = axios.put(url, data, config)
    res.then(({ data }) => {
      if (data.warning) {
        miniToastr.warn(data.warning.warningMessage, '警告')
      }
    })
    return res
  },

  async putResData(url, data, callback) {
    let ret = await axios
      .put(url, data)
      .then(async response => {
        if (response.data.code === -1) {
          // router.push('/Error')
        }
        if (response.data.errors) {
          // await store.dispatch('common/setErrors', response.data.errors)
        } else {
          return callback(response.data)
        }
      })
      .catch(response => {
        // エラー共通処理
        Error(response.Error)
      })
    return ret
  },
  async put(url, data, callback) {
    let ret = await this.putResData(url, data, response => {
      return callback(response)
    })
    return ret
  }
}
