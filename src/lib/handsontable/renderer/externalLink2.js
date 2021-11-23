import Handsontable from 'handsontable'
export default function(instance, td, row, col, prop, value, cellProperties) {
  if (value && cellProperties.url) {
    const href = cellProperties.url
    arguments[5] = `<a href="${href}" target="_blank">${value}</a>`
    Handsontable.renderers.HtmlRenderer.apply(this, arguments)
  } else {
    Handsontable.renderers.TextRenderer.apply(this, arguments)
  }
  return td
}
