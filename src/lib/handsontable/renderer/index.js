import Handsontable from 'handsontable'
import _rKeyValueAutocomplete from './keyValueAutocomplete'
import _rExternalLink from './externalLink'
import _rExternalLink2 from './externalLink2'
import _rModalSelect from './modalSelect'
import _rRankRenderer from './rankRenderer'
import _rRouterLink from './router-link'
import _rDate from './date'
import _rPopoverLink from './popover-link'
import keyValueRenderer from './keyValueRenderer'

Handsontable.renderers.registerRenderer(
  'keyValueAutocomplete',
  _rKeyValueAutocomplete
)
Handsontable.renderers.registerRenderer('externalLink', _rExternalLink)
Handsontable.renderers.registerRenderer('externalLink2', _rExternalLink2)
Handsontable.renderers.registerRenderer('modalSelect', _rModalSelect)
Handsontable.renderers.registerRenderer('rankRenderer', _rRankRenderer)
Handsontable.renderers.registerRenderer('routerLink', _rRouterLink)
Handsontable.renderers.registerRenderer('date', _rDate)
Handsontable.renderers.registerRenderer('popoverLink', _rPopoverLink)
Handsontable.renderers.registerRenderer('key-value', keyValueRenderer)
