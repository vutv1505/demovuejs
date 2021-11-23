import initStyle from './initStyle'
import borderHover from './borderHover'
import moveOnHeader from './moveOnHeader'
import moveAndResize from './moveAndResize'

export const DELTA = 5

export default function(popover) {
  const header = popover.querySelector('.popover-header'),
    body = popover.querySelector('.popover-body'),
    arrow = popover.querySelector('.arrow'),
    parentNode = popover.parentElement

  initStyle(popover, header, body, parentNode, arrow)

  // hover border popover
  borderHover(popover, parentNode)

  // when drag, drop header -> move popover
  moveOnHeader(popover, header, parentNode, arrow)

  //when drag, drop left, bottom, right and corner -> resize popover
  moveAndResize(popover, parentNode, arrow)
}
