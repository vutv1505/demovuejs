import { stopPropagation } from 'handsontable/es/helpers/dom/event'
import { hasClass } from 'handsontable/es/helpers/dom/element'

const BUTTON_CLASS_NAME = 'changeType'

export default function(hot) {
  const plugin = hot.getPlugin('dropdownMenu')
  if (plugin && !plugin.reEnable) {
    plugin.onTableClick = function onTableClick(event) {
      stopPropagation(event)

      if (hasClass(event.target, BUTTON_CLASS_NAME) && !this.menu.isOpened()) {
        let offsetTop = 0,
          offsetLeft = 0,
          offsetRight = 0
        const menuWidth = 350
        const rect = event.target.getBoundingClientRect()

        if (this.hot.rootDocument !== this.menu.container.ownerDocument) {
          const frameElement = this.hot.rootWindow.frameElement
          const _frameElement$getBoun = frameElement.getBoundingClientRect(),
            left = _frameElement$getBoun.left,
            right = _frameElement$getBoun.right
          offsetTop = _frameElement$getBoun.top
          offsetLeft = left
          offsetRight = right
        }
        const position = {
          left: rect.left + offsetLeft,
          top: rect.top + event.target.offsetHeight + 3 + offsetTop,
          width: rect.width,
          height: rect.height
        }
        if (innerWidth - rect.right < menuWidth) {
          position.left = rect.right + offsetRight - menuWidth
        }
        this.open(position)
      }
    }
    plugin.reEnable = true
  }
}
