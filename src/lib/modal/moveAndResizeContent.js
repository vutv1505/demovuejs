import { DELTA } from './index'

export default function(dialog, content, parentDialog) {
  parentDialog.addEventListener('mousedown', event => {
    let top = dialog.offsetTop,
      left = dialog.offsetLeft,
      width = content.offsetWidth,
      height = content.offsetHeight,
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
      const initTop = parseInt(dialog.style.top),
        initLeft = parseInt(dialog.style.left),
        initWidth = parseInt(content.style.width),
        initHeight = parseInt(content.style.height)
      const resizeWidth = (event, direction = 1) =>
          (content.style.width =
            initWidth + direction * (event.clientX - mousePressX) + 'px'),
        resizeHeight = (event, direction = 1) =>
          (content.style.height =
            initHeight + direction * (event.clientY - mousePressY) + 'px'),
        moveLeft = event =>
          (dialog.style.left = initLeft + event.clientX - mousePressX + 'px'),
        moveTop = event =>
          (dialog.style.top = initTop + event.clientY - mousePressY + 'px')
      const moveAndResizeHandler = event => {
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
      parentDialog.addEventListener('mousemove', moveAndResizeHandler)

      window.addEventListener('mouseup', function() {
        parentDialog.removeEventListener('mousemove', moveAndResizeHandler)
        window.removeEventListener('mouseup', this)
      })
    }
  })
}
