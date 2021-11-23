import ApiService, { getUrl } from './api.service'
import { MOCK_USER_SESSION } from '@/assets/mockdata/user'
import { DatePattern, formatDate } from '@/lib/DateUtils'
import URLPATH from '@/api/url-path'

const basePath = getUrl(URLPATH.purchase, 'purchase')
export default {
  getList() {
    // TODO change when finish authentication flow
    const body = { accountID: MOCK_USER_SESSION.accountCode }
    return ApiService.post(`${basePath}/getAllData`, body)
  },
  search(body) {
    if (!body) {
      body = {}
    }
    // TODO change when finish authentication flow
    body.accountID = MOCK_USER_SESSION.accountCode
    if (
      Object.prototype.hasOwnProperty.call(body, 'purchaseScheduleDateStart')
    ) {
      body.purchaseScheduleDateStart = formatDate(
        body.purchaseScheduleDateStart,
        DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ
      )
    }
    if (Object.prototype.hasOwnProperty.call(body, 'purchaseScheduleDateEnd')) {
      body.purchaseScheduleDateEnd = formatDate(
        body.purchaseScheduleDateEnd,
        DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ
      )
    }
    if (Object.prototype.hasOwnProperty.call(body, 'purchaseDateStart')) {
      body.purchaseDateStart = formatDate(
        body.purchaseDateStart,
        DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ
      )
    }
    if (Object.prototype.hasOwnProperty.call(body, 'purchaseDateEnd')) {
      body.purchaseDateEnd = formatDate(
        body.purchaseDateEnd,
        DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ
      )
    }
    return ApiService.post(`${basePath}/search/criteria`, body)
  },
  getByArrivalId(purchaseId, supplierCode) {
    const body = {
      accountID: MOCK_USER_SESSION.accountCode,
      purchaseScheduleNumber: purchaseId,
      supplierCode: supplierCode
    }
    return ApiService.post(`${basePath}/search/id`, body)
  },
  save(requestBody) {
    if (Object.prototype.hasOwnProperty.call(requestBody, 'useDeadline')) {
      requestBody.useDeadline = formatDate(
        requestBody.useDeadline,
        DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ
      )
    }
    if (Object.prototype.hasOwnProperty.call(requestBody, 'makeDate')) {
      requestBody.makeDate = formatDate(
        requestBody.makeDate,
        DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ
      )
    }
    if (Object.prototype.hasOwnProperty.call(requestBody, 'fillingDate')) {
      requestBody.fillingDate = formatDate(
        requestBody.fillingDate,
        DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ
      )
    }
    if (Object.prototype.hasOwnProperty.call(requestBody, 'purchaseDate')) {
      requestBody.purchaseDate = formatDate(
        requestBody.purchaseDate,
        DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ
      )
    }
    if (
      Object.prototype.hasOwnProperty.call(requestBody, 'deliveryScheduleDate')
    ) {
      requestBody.deliveryScheduleDate = formatDate(
        requestBody.deliveryScheduleDate,
        DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ
      )
    }
    if (
      Object.prototype.hasOwnProperty.call(requestBody, 'purchaseScheduleDate')
    ) {
      requestBody.purchaseScheduleDate = formatDate(
        requestBody.purchaseScheduleDate,
        DatePattern.YYYY_MM_DDTHH_MM_SS_SSSZ
      )
    }
    // TODO change when finish authentication flow
    requestBody.accountID = MOCK_USER_SESSION.accountCode
    return ApiService.put(`${basePath}/save`, requestBody)
  }
}
