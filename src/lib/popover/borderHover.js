import { DELTA } from './index'

export default function(popover, parentNode) {
  const defaultCursor = ''
  parentNode.addEventListener('mousemove', event => {
    const rect = popover.getBoundingClientRect()
    let top = rect.top,
      left = rect.left,
      width = popover.offsetWidth,
      height = popover.offsetHeight
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
        parentNode.style.cursor = 'nesw-resize'
      } else if (deltaRight < DELTA && deltaBottom < DELTA) {
        parentNode.style.cursor = 'nwse-resize'
      } else if (deltaRight < DELTA && deltaTop < DELTA) {
        parentNode.style.cursor = 'nesw-resize'
      } else if (deltaLeft < DELTA && deltaTop < DELTA) {
        parentNode.style.cursor = 'nwse-resize'
      } else if (deltaLeft < DELTA || deltaRight < DELTA) {
        parentNode.style.cursor = 'ew-resize'
      } else if (deltaTop < DELTA || deltaBottom < DELTA) {
        parentNode.style.cursor = 'ns-resize'
      } else {
        resetCursor(parentNode, defaultCursor)
      }
    } else {
      resetCursor(parentNode, defaultCursor)
    }
  })
}

function resetCursor(popover, defaultCursor) {
  defaultCursor
    ? (popover.style.cursor = defaultCursor)
    : popover.style.removeProperty('cursor')
}
