import Handsontable from 'handsontable'
import moment from 'moment'
export default function(instance, td, row, col, prop, value, cellProperties) {
  if (typeof cellProperties.dateFormat === 'string') {
    Handsontable.renderers.DateRenderer.apply(this, arguments)
    return td
  }
  Handsontable.renderers.TextRenderer.apply(this, arguments)
  let displayValue = ''
  if (value !== null) {
    if (typeof value === 'string' && value.trim()) {
      displayValue = moment(
        value,
        cellProperties.dateFormat.value || 'YYYY/MM/DD HH:mm:ss'
      ).format(cellProperties.dateFormat.display || 'YYYY/MM/DD HH:mm:ss')
    } else if (typeof value === 'object') {
      displayValue = moment(value).format(
        cellProperties.dateFormat.display || 'YYYY/MM/DD HH:mm:ss'
      )
    }
  }
  td.innerHTML = displayValue
  return td
}
