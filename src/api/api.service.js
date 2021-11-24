import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const ApiService = {
  init() {
    Vue.use(VueAxios, axios)
    axios.defaults.baseURL = `https://apisaapp.azurewebsites.net/api/dev/`
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
    return axios.post(`${resource}`, params)
  },

  update(resource, slug, params) {
    return axios.put(`${resource}/${slug}`, params)
  },

  put(resource, params) {
    return axios.put(`${resource}`, params)
  },

  delete(resource) {
    return axios.delete(resource).catch(error => {
      throw new Error(`ApiService ${error}`)
    })
  }
}

export default ApiService
