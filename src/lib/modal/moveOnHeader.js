import { DELTA } from './index'

export default function(dialog, header, parentDialog) {
  parentDialog.addEventListener('mousedown', event => {
    if (
      event.clientX > dialog.offsetLeft + DELTA &&
      event.clientX < dialog.offsetLeft + header.offsetWidth - DELTA &&
      event.clientY > dialog.offsetTop + DELTA &&
      event.clientY < dialog.offsetTop + header.offsetHeight
    ) {
      const defaultCursor = header.style.cursor
      header.style.cursor = 'move'

      let top = dialog.style.top
      top = top ? parseInt(top) : 0
      let left = dialog.style.left
      left = left ? parseInt(left) : 0

      const startPosition = {
        left,
        top,
        mousePressX: event.clientX,
        mousePressY: event.clientY
      }
      const repositionHandler = event => {
        dialog.style.left =
          startPosition.left + event.clientX - startPosition.mousePressX + 'px'
        dialog.style.top =
          startPosition.top + event.clientY - startPosition.mousePressY + 'px'
      }

      parentDialog.addEventListener('mousemove', repositionHandler)

      window.addEventListener('mouseup', function() {
        parentDialog.removeEventListener('mousemove', repositionHandler)
        window.removeEventListener('mouseup', this)
        defaultCursor
          ? (header.style.cursor = defaultCursor)
          : header.style.removeProperty('cursor')
      })
    }
  })
}
