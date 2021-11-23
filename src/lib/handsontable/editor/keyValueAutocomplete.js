import Handsontable from 'handsontable'

export default class KeyValueAutocompleteEditor extends Handsontable.editors
  .AutocompleteEditor {
  constructor(props) {
    super(props)
  }

  prepare(row, col, prop, TD, originalValue, cellProperties) {
    if (cellProperties.suggestList) {
      cellProperties.source = cellProperties.suggestList.map(item => item.code)
    }
    super.prepare(row, col, prop, TD, originalValue, cellProperties)
  }
}
