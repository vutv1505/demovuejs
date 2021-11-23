import ValueComponent from 'handsontable/es/plugins/filters/component/value'
import { toEmptyString } from 'handsontable/es/plugins/filters/utils'
import Handsontable from 'handsontable'
import { getSourceItems } from 'handsontable-key-value/commonjs/common'
import * as C from 'handsontable/es/i18n/constants'

export default function(hot) {
  const plugin = hot.getPlugin('filtersKeyValue')
  if (plugin && !plugin.reEnable) {
    const filterComponent = plugin.components.get('filter_by_value')

    // hook select all item by text filter
    const defaultOnActionBarSubmit = plugin.onActionBarSubmit
    plugin.onActionBarSubmit = function onActionBarSubmit(submitType) {
      const multipleSelectElement = filterComponent.elements[0]
      if (multipleSelectElement) {
        const textFilter =
          multipleSelectElement.searchInput &&
          multipleSelectElement.searchInput.getValue()
        if (textFilter) {
          const items = multipleSelectElement.getItems() || [],
            filteredValues = multipleSelectElement.itemsBox
              .getSourceData()
              .map(item => item.value)
          items.forEach(
            item =>
              (item.checked =
                filteredValues.includes(item.value) && item.checked)
          )
          multipleSelectElement.setItems(items)
        }
      }
      defaultOnActionBarSubmit.call(this, submitType)
    }

    if (filterComponent) {
      // hook clear all condition filter
      filterComponent.updateState = function updateState() {
        if (this.hot.onClearFilterAndSort) {
          ValueComponent.prototype.updateState.apply(this, arguments)
        }
      }

      //hook sort display item
      filterComponent._getColumnVisibleValues = function _getColumnVisibleValues(
        callback
      ) {
        const lastSelectedColumn = plugin.getSelectedColumn()
        const visualIndex = lastSelectedColumn && lastSelectedColumn.visualIndex
        const physicalIndex =
          lastSelectedColumn && lastSelectedColumn.physicalIndex
        const columnSettings = this.hot.getSettings().columns[physicalIndex]

        const colData = Handsontable.helper.arrayMap(
          this.hot.getDataAtCol(visualIndex),
          function(v) {
            return toEmptyString(v)
          }
        )

        if (columnSettings.type === 'key-value') {
          const cellProperties = {
            instance: this.hot,
            col: physicalIndex,
            visualcol: visualIndex,
            prop: columnSettings.data,
            row: null,
            visualRow: null
          }
          getSourceItems.call(cellProperties, columnSettings.source, function(
            items
          ) {
            const visibleValues = items
              .filter(item =>
                colData.some(
                  colItem =>
                    colItem != null &&
                    String(colItem).trim().length > 0 &&
                    colItem == item[columnSettings.keyProperty]
                )
              )
              .map(function(item) {
                return {
                  key: item[columnSettings.keyProperty],
                  value: item[columnSettings.valueProperty]
                }
              })
              .sort((item1, item2) => {
                if (!item1.value) {
                  return -1
                }
                if (!item2.value) {
                  return 1
                }
                return item1.value > item2.value
                  ? -1
                  : item1.value === item2.value
                  ? 0
                  : 1
              })
            if (colData && colData.some(item => item === ' ')) {
              visibleValues.push({
                key: ' ',
                value: `(${hot.getTranslatedPhrase(
                  C.FILTERS_VALUES_BLANK_CELLS
                )})`
              })
            }
            callback(visibleValues)
          })
        } else {
          callback(colData)
        }
      }
    }
    plugin.reEnable = true
  }
}
