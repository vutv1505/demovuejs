import ApiService from './api.service'

//TODO const basePath = 'handlers/searchPanel'
const basePath =
  'https://kw6ssg3m5a.execute-api.ap-northeast-1.amazonaws.com/dev'

export default {
  save(requestBody) {
    return ApiService.post(`${basePath}/save`, requestBody)
  },
  get(params) {
    return ApiService.get(`${basePath}/search`, params)
  }
}
