import { DELTA } from './index'
export default function(dialog, content, parentDialog) {
  const defaultCursor = parentDialog.style.cursor
  parentDialog.addEventListener('mousemove', event => {
    let top = dialog.offsetTop,
      left = dialog.offsetLeft,
      width = content.offsetWidth,
      height = content.offsetHeight
    const deltaLeft = Math.abs(event.clientX - left),
      deltaRight = Math.abs(event.clientX - (left + width)),
      deltaTop = Math.abs(event.clientY - top),
      deltaBottom = Math.abs(event.clientY - (top + height))

    if (
      event.clientY >= top - DELTA &&
      event.clientY <= top + height + DELTA &&
      event.clientX >= left - DELTA &&
      event.clientX <= left + width + DELTA
    ) {
      if (deltaLeft < DELTA && deltaBottom < DELTA) {
        parentDialog.style.cursor = 'nesw-resize'
      } else if (deltaRight < DELTA && deltaBottom < DELTA) {
        parentDialog.style.cursor = 'nwse-resize'
      } else if (deltaRight < DELTA && deltaTop < DELTA) {
        parentDialog.style.cursor = 'nesw-resize'
      } else if (deltaLeft < DELTA && deltaTop < DELTA) {
        parentDialog.style.cursor = 'nwse-resize'
      } else if (deltaLeft < DELTA || deltaRight < DELTA) {
        parentDialog.style.cursor = 'ew-resize'
      } else if (deltaTop < DELTA || deltaBottom < DELTA) {
        parentDialog.style.cursor = 'ns-resize'
      } else {
        resetCursor(parentDialog, defaultCursor)
      }
    } else {
      resetCursor(parentDialog, defaultCursor)
    }
  })
}

function resetCursor(parentDialog, defaultCursor) {
  defaultCursor
    ? (parentDialog.style.cursor = defaultCursor)
    : parentDialog.style.removeProperty('cursor')
}
