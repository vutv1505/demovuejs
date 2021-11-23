import handsontableKeyValue from 'handsontable-key-value'
export default class KeyValueEditor extends handsontableKeyValue.KeyValueEditor {
  createElements(...arg) {
    super.createElements(...arg)
  }
  getValue() {
    let value = super.getValue()

    const textValue = this.TEXTAREA.value
    if (value == null && textValue) {
      value = this.originalValue
    }
    return value
  }
}
