import Handsontable from 'handsontable'
import getSourceItems from 'handsontable-key-value/commonjs/common/getSourceItems'

function _getSourceItem(items, keyProperty, keyValue) {
  return items.find(function(item) {
    const key = item[keyProperty]
    let castedKeyValue = keyValue
    if (keyValue === null && key !== null) {
      return false
    }
    if (keyValue === undefined && key !== undefined) {
      return false
    }
    if (typeof castedKeyValue !== typeof key) {
      if (typeof key === 'number') {
        castedKeyValue = Number(keyValue)
      } else if (typeof key === 'boolean') {
        castedKeyValue = keyValue === 'true'
      }
    }

    return key === castedKeyValue
  })
}

function getSourceItem(source, keyProperty, keyValue, callback) {
  getSourceItems.call(this, source, function(items) {
    if (items) {
      callback(_getSourceItem(items, keyProperty, keyValue))
    } else {
      callback(null)
    }
  })
}

function getDisplayValue(
  source,
  keyProperty,
  valueProperty,
  keyValue,
  callback
) {
  getSourceItem.call(this, source, keyProperty, keyValue, function(item) {
    callback(item ? item[valueProperty] : null)
  })
}

function keyValueRenderer(instance, td, row, col, prop, value, cellProperties) {
  const _this = this
  const colIndex = instance.toPhysicalColumn(col)
  const columnSettings = instance.getSettings().columns[colIndex]
  getDisplayValue.call(
    cellProperties,
    columnSettings.source,
    columnSettings.keyProperty,
    columnSettings.valueProperty,
    value,
    function(displayValue) {
      Handsontable.renderers
        .getRenderer('dropdown')
        .apply(_this, [
          instance,
          td,
          row,
          col,
          prop,
          displayValue !== null ? displayValue : value,
          cellProperties
        ])
    }
  )
}

export default keyValueRenderer
