import ApiService, { getUrl } from './api.service'
import URLPATH from '@/api/url-path'
import { MOCK_USER_SESSION } from '@/assets/mockdata/user'

const basePath = getUrl(URLPATH.purchaseregistration, 'purchaseregistration')
//todo change basePath to fileImport
export default {
  getOrderList() {
    // TODO change when finish authentication flow
    const requestBody = { accountID: MOCK_USER_SESSION.accountCode }
    return ApiService.post(`${basePath}/searchnumber`, requestBody)
  }
}
