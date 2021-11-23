import Handsontable from 'handsontable'
import './sorting.js'
import modifyComment from './comment'
import modifyKeyValueFilters from './keyValueFilters'
import modifyExportFile from './exportFile'
import modifyDropdownMenu from './dropdownMenu'
import './condition/byValue'

Handsontable.hooks.add('afterPluginsInitialized', function() {
  modifyKeyValueFilters(this)
  modifyComment(this)
  modifyExportFile(this)
  modifyDropdownMenu(this)
})
