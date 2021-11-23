import ApiService, { getUrl } from './api.service'
import URLPATH from '@/api/url-path'
import { MOCK_USER_SESSION } from '@/assets/mockdata/user'

const basePath = getUrl(URLPATH.fileImport, 'fileimport')
//todo change basePath to fileImport
export default {
  getList() {
    // TODO change when finish authentication flow
    const requestBody = { accountID: MOCK_USER_SESSION.accountCode }
    return ApiService.post(`${basePath}/getalldata`, requestBody)
    //Todo change path to getAllData
  },
  search(body) {
    if (!body) {
      body = {}
    }
    // TODO change when finish authentication flow
    body.accountID = MOCK_USER_SESSION.accountCode
    return ApiService.post(`${basePath}/search/criteria`, body)
  },
  getByFileId(fileId) {
    const body = {
      accountID: MOCK_USER_SESSION.accountCode,
      importNumber: fileId
    }
    return ApiService.post(`${basePath}/search/id`, body)
      .then(result => result)
      .catch(error => {
        throw new Error(`File Management service ${error}`)
      })
  }
}
