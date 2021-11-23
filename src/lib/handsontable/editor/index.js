import Handsontable from 'handsontable'
import KeyValueAutocompleteEditor from './keyValueAutocomplete'
import ModalSelectEditor from './modalSelect'
import PatternEditor from './pattern'
import DatePickerEditor from './date'

Handsontable.editors.registerEditor(
  'keyValueAutocomplete',
  KeyValueAutocompleteEditor
)
Handsontable.editors.registerEditor('modalSelect', ModalSelectEditor)
Handsontable.editors.registerEditor('pattern', PatternEditor)
Handsontable.editors.registerEditor('date', DatePickerEditor)
