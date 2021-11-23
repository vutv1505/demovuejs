import Handsontable from 'handsontable'
import KeyValueEditor from '../editor/keyValue'
import DatePickerEditor from '../editor/date'
import keyValueValidator from '../validators/keyValue'
import keyValueRenderer from '../renderer/keyValueRenderer'

Handsontable.cellTypes.registerCellType('key-value', {
  editor: KeyValueEditor,
  renderer: keyValueRenderer,
  validator: keyValueValidator,
  allowInvalid: true
})
Handsontable.cellTypes.registerCellType('date', {
  editor: DatePickerEditor,
  renderer: Handsontable.renderers.DateRenderer,
  validator: Handsontable.validators.DateValidator,
  allowInvalid: true
})
