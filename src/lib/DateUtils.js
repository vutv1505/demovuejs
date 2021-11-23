import moment from 'moment'

export const DatePattern = {
  YYYY_MM_DD: 'YYYY/MM/DD',
  YYYY_MM: 'YYYY/MM',
  YYYY__MM__DD: 'YYYY-MM-DD',
  YYYY_MM_DDTHH_MM_SS_SSSZ: 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
}
export function formatDate(strDateInput, pattern) {
  if (!strDateInput) {
    return ''
  }
  return moment(strDateInput, pattern).format(pattern)
}
