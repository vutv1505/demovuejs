import './cellType'
import './renderer'
import './editor'
import './plugins'

export function filterList(filterWord, setting, dataTable) {
  let resultFilterList
  if (filterWord) {
    const mapSource = {}
    const initSourceIfNotExist = prop => {
      if (!mapSource[prop]) {
        let source = setting.mapColumns[prop].source
        if (!Array.isArray(source)) {
          source(null, _source => (source = _source))
        }
        mapSource[prop] = source
      }
    }
    const getDisplayText = ([prop, value]) => {
      const cellMeta = setting.mapColumns[prop]
      if (!cellMeta || cellMeta.hidden === true) {
        return ''
      }
      if (cellMeta && cellMeta.type === 'key-value') {
        initSourceIfNotExist(prop)
        if (mapSource[prop]) {
          const cellItem = mapSource[prop].find(
            item => item[cellMeta.keyProperty] == value
          )
          return cellItem ? cellItem[cellMeta.valueProperty] : ''
        } else {
          return value.toString()
        }
      } else {
        return value.toString()
      }
    }
    resultFilterList = dataTable.filter(row => {
      return Object.entries(row)
        .filter(([, value]) => value != null && value !== '')
        .some(
          cell =>
            getDisplayText(cell)
              .toLowerCase()
              .indexOf(filterWord.toLowerCase()) !== -1
        )
    })
  } else {
    resultFilterList = dataTable
  }
  return resultFilterList
}
