export default function(dialog, content, left, width, height) {
  dialog.style.top = 0 + 'px'
  dialog.style.left = left + 'px'
  dialog.style.maxWidth = dialog.style.maxHeight = 'unset'

  content.style.width = width + 'px'
  content.style.height = height + 'px'
  content.style.maxWidth = content.style.maxHeight = 'unset'
}
