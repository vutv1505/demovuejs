export default function(instance, td, row, col, prop, value, cellProperties) {
  if (value > 0) {
    td.innerText = value + '位'
    td.style.color = 'blue'
  } else {
    td.innerText = '--位'
  }
  td.className = 'htRight'
  return td
}
