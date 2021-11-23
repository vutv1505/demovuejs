import Handsontable from 'handsontable'

const inputList = [
  'input',
  'keydown',
  'keyup',
  'mousedown',
  'mouseup',
  'select',
  'contextmenu',
  'drop'
]

export default class PatternEditor extends Handsontable.editors.TextEditor {
  constructor(props) {
    super(props)
  }

  prepare(row, col, prop, TD, originalValue, cellProperties) {
    if (!cellProperties.prepared) {
      this.setInputFilter(this.TEXTAREA, function(value) {
        return cellProperties.patternConfig.pattern.test(value)
      })
      cellProperties.prepared = true
    }
    super.prepare(row, col, prop, TD, originalValue, cellProperties)
  }

  createElements() {
    super.createElements()
    this.TEXTAREA = document.createElement('input')
    this.TEXTAREA.className = 'handsontableInput'
    this.textareaStyle = this.TEXTAREA.style
    Handsontable.dom.empty(this.TEXTAREA_PARENT)
    this.TEXTAREA_PARENT.appendChild(this.TEXTAREA)
  }

  setInputFilter(inputBox, inputFilter) {
    inputList.forEach(function(event) {
      inputBox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value
          this.oldSelectionStart = this.selectionStart
          this.oldSelectionEnd = this.selectionEnd
        } else if ({}.hasOwnProperty.call(this, 'oldValue')) {
          this.value = this.oldValue
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd)
        }
      })
    })
  }
}
