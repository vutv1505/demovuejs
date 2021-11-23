import { DELTA } from './index'

export default function(popover, header, parentNode, arrow) {
  parentNode.addEventListener('mousedown', event => {
    const rect = popover.getBoundingClientRect()
    if (
      event.clientX > rect.left + DELTA &&
      event.clientX < rect.left + header.offsetWidth - DELTA &&
      event.clientY > rect.top + DELTA &&
      event.clientY < rect.top + header.offsetHeight
    ) {
      const defaultCursor = header.style.cursor
      header.style.cursor = 'move'

      let top = popover.style.top
      top = top ? parseInt(top) : 0
      let left = popover.style.left
      left = left ? parseInt(left) : 0

      const startPosition = {
        left,
        top,
        mousePressX: event.clientX,
        mousePressY: event.clientY
      }

      const repositionHandler = event => {
        arrow.style.display = 'none'
        popover.style.left =
          startPosition.left + event.clientX - startPosition.mousePressX + 'px'
        popover.style.top =
          startPosition.top + event.clientY - startPosition.mousePressY + 'px'
      }

      parentNode.addEventListener('mousemove', repositionHandler)

      window.addEventListener('mouseup', function() {
        parentNode.removeEventListener('mousemove', repositionHandler)
        window.removeEventListener('mouseup', this)
        defaultCursor
          ? (header.style.cursor = defaultCursor)
          : header.style.removeProperty('cursor')
      })
    }
  })
}
