import keyValue from 'handsontable-key-value'

export default function keyValueValidator(value, callback) {
  if (value == null || value === '') {
    callback(true)
  } else {
    keyValue.keyValueValidator.call(this, value, callback)
  }
}
