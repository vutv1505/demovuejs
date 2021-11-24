import ApiService from './api.service'

const basePath = 'https://apisaapp.azurewebsites.net/api/dev'
export default {
  getList() {
    let body = {
      "accountID": "1"
    }
    // TODO change when finish authentication flow
    return ApiService.get(`${basePath}/productBasicMaster/getAllData`, body)
  },
  save(body) {
    if (!body) {
      body = {}
    }
    console.log(body)
    // TODO change when finish authentication flow
    return ApiService.put(`${basePath}/productBasicMaster/create`, body)
  },
  delete(id) {
    let body = {
      "accountID": "1",
      "productCode": id
    }
    // TODO change when finish authentication flow
    return ApiService.post(`${basePath}/productBasicMaster/delete`, body)
  }
}
