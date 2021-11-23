import moveOnHeader from './moveOnHeader'
import moveAndResizeContent from './moveAndResizeContent'
import borderHover from './borderHover'
import initStyle from './initStyle'

export const DELTA = 5

export default function(modalRefs) {
  const dialog = modalRefs.dialog,
    content = modalRefs.content,
    parentDialog = dialog.parentElement,
    width = dialog.offsetWidth,
    height = dialog.offsetHeight,
    left = dialog.offsetLeft

  initStyle(dialog, content, left, width, height)

  // hover border modal
  borderHover(dialog, content, parentDialog)

  // when drag, drop header
  moveOnHeader(dialog, modalRefs.header, parentDialog)

  //when drag, drop left, bottom, right and corner
  moveAndResizeContent(dialog, content, parentDialog)
}
