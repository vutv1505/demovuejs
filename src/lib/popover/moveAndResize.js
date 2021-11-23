import { DELTA } from './index'

export default function(popover, parentNode, arrow) {
  parentNode.addEventListener('mousedown', event => {
    event.preventDefault()
    const rect = popover.getBoundingClientRect()
    let top = rect.top,
      left = rect.left,
      width = popover.offsetWidth,
      height = popover.offsetHeight,
      mousePressX = event.clientX,
      mousePressY = event.clientY

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
      const initTop = parseInt(popover.offsetTop),
        initLeft = parseInt(popover.offsetLeft),
        initWidth = parseInt(popover.offsetWidth),
        initHeight = parseInt(popover.offsetHeight)
      const resizeWidth = (event, direction = 1) =>
          (popover.style.width =
            initWidth + direction * (event.clientX - mousePressX) + 'px'),
        resizeHeight = (event, direction = 1) =>
          (popover.style.height =
            initHeight + direction * (event.clientY - mousePressY) + 'px'),
        moveLeft = event =>
          (popover.style.left = initLeft + event.clientX - mousePressX + 'px'),
        moveTop = event =>
          (popover.style.top = initTop + event.clientY - mousePressY + 'px')
      const moveAndResizeHandler = event => {
        event.preventDefault()
        arrow.style.display = 'none'
        if (deltaLeft < DELTA && deltaBottom < DELTA) {
          // left-bottom corner
          resizeWidth(event, -1)
          resizeHeight(event)
          moveLeft(event)
        } else if (deltaRight < DELTA && deltaBottom < DELTA) {
          // right-bottom corner
          resizeWidth(event)
          resizeHeight(event)
        } else if (deltaRight < DELTA && deltaTop < DELTA) {
          // right-top corner
          resizeWidth(event)
          resizeHeight(event, -1)
          moveTop(event)
        } else if (deltaLeft < DELTA && deltaTop < DELTA) {
          //left-top corner
          resizeWidth(event, -1)
          resizeHeight(event, -1)
          moveTop(event)
          moveLeft(event)
        } else if (deltaRight < DELTA) {
          // right border
          resizeWidth(event)
        } else if (deltaLeft < DELTA) {
          // left border
          resizeWidth(event, -1)
          moveLeft(event)
        } else if (deltaBottom < DELTA) {
          // bottom border
          resizeHeight(event)
        } else if (deltaTop < DELTA) {
          // top border
          resizeHeight(event, -1)
          moveTop(event)
        }
      }
      parentNode.addEventListener('mousemove', moveAndResizeHandler)

      window.addEventListener('mouseup', function() {
        parentNode.removeEventListener('mousemove', moveAndResizeHandler)
        window.removeEventListener('mouseup', this)
      })
    }
  })
}
