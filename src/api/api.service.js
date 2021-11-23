import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import CharUtil from '@/lib/CharUtil'
import objectUtil from '@/lib/objectUtil'

const ApiService = {
  init() {
    Vue.use(VueAxios, axios)
    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
  },

  setHeader() {
    axios.defaults.headers.common['Content-Type'] = 'application/json'
  },

  query(resource, params) {
    return axios.get(resource, params).catch(error => {
      throw new Error(`ApiService ${error}`)
    })
  },

  get(resource, getParams) {
    return axios.get(`${resource}`, { params: getParams }).catch(error => {
      throw new Error(`ApiService ${error}`)
    })
  },

  post(resource, params) {
    params = objectUtil.removeEmptyAttribute(params)
    CharUtil.convertObjToContainsHalfWidthNumericFullWidthKatakana(params)
    return axios.post(`${resource}`, params)
  },

  update(resource, slug, params) {
    params = objectUtil.removeEmptyAttribute(params)
    CharUtil.convertObjToContainsHalfWidthNumericFullWidthKatakana(params)
    return axios.put(`${resource}/${slug}`, params)
  },

  put(resource, params) {
    params = objectUtil.removeEmptyAttribute(params)
    CharUtil.convertObjToContainsHalfWidthNumericFullWidthKatakana(params)
    return axios.put(`${resource}`, params)
  },

  delete(resource) {
    return axios.delete(resource).catch(error => {
      throw new Error(`ApiService ${error}`)
    })
  }
}

export const getUrl = (urlPath, basePath) =>
  `https://${urlPath}.execute-api.ap-northeast-1.amazonaws.com/dev/${basePath}`
//Todo change when endpoint point to cloudfront

export default ApiService
