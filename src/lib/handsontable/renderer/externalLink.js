import stringFormat from 'string-format'
import Handsontable from 'handsontable'
export default function(instance, td, row, col, prop, value, cellProperties) {
  if (value && cellProperties.linkConfig && cellProperties.linkConfig.url) {
    const rowValue = instance.getSourceDataAtRow(instance.toPhysicalRow(row))
      ? instance.getSourceDataAtRow(instance.toPhysicalRow(row))
      : {}
    const href = stringFormat(cellProperties.linkConfig.url, value, rowValue)
    arguments[5] = `<a href="${href}" target="${
      cellProperties.linkConfig.target
        ? cellProperties.linkConfig.target
        : '_blank'
    }">${value}</a>`
    Handsontable.renderers.HtmlRenderer.apply(this, arguments)
  } else {
    Handsontable.renderers.TextRenderer.apply(this, arguments)
  }
  return td
}
