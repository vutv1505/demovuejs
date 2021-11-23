import ApiService, { getUrl } from './api.service'
import { MOCK_USER_SESSION } from '@/assets/mockdata/user'
import URLPATH from '@/api/url-path'
import { DatePattern, formatDate } from '@/lib/DateUtils'

const basePath = getUrl(URLPATH.billing, 'billing')
export default {
  getList() {
    // TODO change when finish authentication flow
    const requestBody = { accountID: MOCK_USER_SESSION.accountCode }
    return ApiService.post(`${basePath}/getAllData`, requestBody)
  },
  search(body) {
    if (!body) {
      body = {}
    }
    if (Object.prototype.hasOwnProperty.call(body, 'paymentBillingYyMm')) {
      body.paymentBillingYyMm = formatDate(
        body.paymentBillingYyMm,
        DatePattern.YYYY_MM
      )
    }
    // TODO change when finish authentication flow
    body.accountID = MOCK_USER_SESSION.accountCode
    return ApiService.post(`${basePath}/search/criteria`, body)
  },
  getByBillingId(billingId, supplierCode, paymentBillingYyMm) {
    const body = {
      accountID: MOCK_USER_SESSION.accountCode,
      paymentBillingNumber: billingId,
      supplierCode: supplierCode,
      paymentBillingYyMm: paymentBillingYyMm
    }
    return ApiService.post(`${basePath}/search/id`, body)
  },
  save(body) {
    if (!body) {
      body = {}
    }
    // TODO change when finish authentication flow
    body.accountID = MOCK_USER_SESSION.accountCode
    return ApiService.put(`${basePath}/save`, body)
  }
}
