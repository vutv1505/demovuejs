import ApiService, { getUrl } from './api.service'
import URLPATH from '@/api/url-path'

const basePath = getUrl(URLPATH.divisionMaster, 'divisionMaster')
export default {
  getAll() {
    return ApiService.get(`${basePath}/getData`)
  },
  getCategoryItems(categoryCode) {
    const body = {
      divisionCategoryCode: categoryCode
    }
    return ApiService.post(`${basePath}/searchCategoryCode`, body)
  },
  getItem(categoryCode, itemCode) {
    const body = {
      divisionCategoryCode: categoryCode,
      divisionCode: itemCode
    }
    return ApiService.post(`${basePath}/searchCode`, body)
  }
}
