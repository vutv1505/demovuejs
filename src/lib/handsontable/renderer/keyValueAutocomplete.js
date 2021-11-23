import Hansontable from 'handsontable'
export default function(instance, td, row, col, prop, value, cellProperties) {
  Hansontable.renderers.AutocompleteRenderer.apply(this, arguments)
  const suggestList = cellProperties.suggestList || [],
    selectedItem = suggestList.find(item => item.code === value)
  td.innerText = selectedItem ? selectedItem.name : ''
  return td
}
