export default function(popover, header, body, parentNode, arrow) {
  parentNode.className = 'vw-100 vh-100 position-absolute'
  parentNode.style.zIndex = '1050'
  popover.style.maxWidth = popover.style.maxHeight = 'unset'
  arrow.style.display = 'block'
  body.style.height = `calc(100% - ${header.offsetHeight}px)`
  body.style.overflowX = 'hidden'
  body.style.overflowY = 'auto'
}
