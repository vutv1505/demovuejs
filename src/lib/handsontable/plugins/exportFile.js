import typeFactory, {
  EXPORT_TYPES
} from 'handsontable/es/plugins/exportFile/typeFactory'
import DataProvider from 'handsontable/es/plugins/exportFile/dataProvider'
import { rangeEach } from 'handsontable/es/helpers/number'

const span = document.createElement('span')
const extractText = string => {
  span.innerHTML = string
  return span.textContent || span.innerText
}

export default function(hot) {
  const plugin = hot.getPlugin('exportFile')
  plugin._createTypeFormatter = function _createTypeFormatter(format) {
    const options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
    if (!EXPORT_TYPES[format]) {
      throw new Error(
        'Export format type "'.concat(format, '" is not supported.')
      )
    }
    const dataProvider = new DataProvider(this.hot)
    dataProvider.getData = function() {
      const _this = this
      const _this$_getDataRange = this._getDataRange(),
        startRow = _this$_getDataRange.startRow,
        startCol = _this$_getDataRange.startCol,
        endRow = _this$_getDataRange.endRow,
        endCol = _this$_getDataRange.endCol
      const options = this.options
      const data = []
      rangeEach(startRow, endRow, function(rowIndex) {
        const row = []
        if (!options.exportHiddenRows && _this._isHiddenRow(rowIndex)) {
          return
        }
        rangeEach(startCol, endCol, function(colIndex) {
          const cellMeta = _this.hot.getCellMeta(startRow, colIndex)
          if (
            !options.exportHiddenColumns &&
            _this._isHiddenColumn(colIndex) &&
            !cellMeta.export
          ) {
            return
          }
          let cellData = _this.hot.getDataAtCell(rowIndex, colIndex)
          if (cellMeta.type === 'key-value') {
            let source = cellMeta.source
            if (source) {
              if (!Array.isArray(source)) {
                cellMeta.source(null, _source => (source = _source))
              }
              const cellItem = source.find(
                item => item[cellMeta.keyProperty] == cellData
              )
              cellData = cellItem ? cellItem[cellMeta.valueProperty] : null
            }
          }
          row.push(cellData)
        })
        data.push(row)
      })
      return data
    }

    dataProvider.getColumnHeaders = function() {
      const _this = this
      const headers = []

      if (this.options.columnHeaders) {
        const _this$_getDataRange3 = this._getDataRange(),
          startCol = _this$_getDataRange3.startCol,
          endCol = _this$_getDataRange3.endCol

        const colHeaders = hot.getColHeader()
        const columns = hot.getSettings().columns
        rangeEach(startCol, endCol, function(column) {
          if (
            !_this.options.exportHiddenColumns &&
            _this._isHiddenColumn(column) &&
            !columns[column].export
          ) {
            return
          }

          headers.push(extractText(colHeaders[column]))
        })
      }
      return headers
    }
    return typeFactory(format, dataProvider, options)
  }
}
