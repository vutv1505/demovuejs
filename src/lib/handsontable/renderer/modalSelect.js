import Hansontable from 'handsontable'

export default function(instance, td, row, col, prop, value, cellProperties) {
  Hansontable.renderers.TextRenderer.apply(this, arguments)

  if (value) {
    const displayValue = cellProperties.codeToDisplayValue[value]
    displayValue && (td.innerText = displayValue)
  }
  return td
}
