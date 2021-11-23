import Handsontable from 'handsontable'
import keyValueValidator from './keyValue'

Handsontable.validators.registerValidator('key-value', keyValueValidator)
