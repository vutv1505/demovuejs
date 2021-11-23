import Handsontable from 'handsontable'

export default function(hot) {
  const plugin = hot.getPlugin('comments')
  if (plugin && !plugin.reEnable) {
    plugin.refreshEditor = function refreshEditor() {
      Handsontable.plugins.Comments.prototype.refreshEditor.apply(
        this,
        arguments
      )
      this.editor.editorStyle.right =
        innerWidth -
        Number(this.editor.editorStyle.left.replace('px', '')) +
        'px'
      this.editor.editorStyle.bottom =
        innerHeight -
        Number(this.editor.editorStyle.top.replace('px', '')) +
        'px'

      this.editor.editorStyle.left = ''
      this.editor.editorStyle.top = ''
    }

    plugin.editor &&
      (plugin.editor.destroy = function destroy() {
        this.editor.parentNode.removeChild(this.editor)
        this.editor = null
        this.editorStyle = null
      })
    plugin.reEnable = true
  }
}
