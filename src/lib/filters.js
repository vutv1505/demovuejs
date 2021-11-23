import Vue from 'vue'
import { numberFormat, dayOfWeekBefore } from './format'
import moment from 'moment'
import _ from 'lodash'

Vue.filter('dynamicFilter', function(value, name, ...args) {
  return name ? Vue.filter(name)(value, ...args) : value
})

function keyValueFilter(value, list, idField, showField) {
  const listData = typeof list === 'function' ? list() : list
  const targetItem = (listData || []).find(item => item[idField] == value)
  if (targetItem) {
    return typeof showField === 'function'
      ? showField(targetItem)
      : targetItem[showField]
  } else {
    return ''
  }
}

Vue.filter('key-value', keyValueFilter)

Vue.filter('keyValue', keyValueFilter)

Vue.filter('number', function(value) {
  return numberFormat(value)
})

Vue.filter('commaFormat', function(value) {
  if (value) {
    return value.toLocaleString()
  }
})

Vue.filter('dateFormat', function(
  value,
  outPutFormat,
  inputFormat = 'YYYY/MM/DD HH:mm:ss'
) {
  if (!value) {
    return ''
  }
  if (typeof value === 'string') {
    return moment(value, inputFormat).format(outPutFormat)
  } else if (typeof value === 'object') {
    return moment(value).format(outPutFormat)
  } else {
    return ''
  }
})

Vue.filter('hasUnselected', function(listData) {
  const newListData = _.cloneDeep(listData)
  newListData.unshift({ value: null, text: '-- 未選択 --' })
  return newListData
})

Vue.filter('dayOfWeekBefore', function(value) {
  return dayOfWeekBefore(value)
})
