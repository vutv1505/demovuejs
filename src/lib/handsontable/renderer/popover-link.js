import CPopoverLink from '@/components/common/CPopoverLink'
import Vue from 'vue'
import Handsontable from 'handsontable'
export default function(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.dom.empty(td)
  td.className = cellProperties.className
  const CPopoverLinkClass = Vue.extend(CPopoverLink)
  const routerElem = new CPopoverLinkClass({
    propsData: {
      display: cellProperties.popoverConfig.valueFormat
        ? cellProperties.popoverConfig.valueFormat(value)
        : value,
      click: cellProperties.popoverConfig.click,
      param: cellProperties.popoverConfig.paramFactory
        ? cellProperties.popoverConfig.paramFactory(
            instance.getSourceDataAtRow(instance.toPhysicalRow(row))
          )
        : instance.getSourceDataAtRow(instance.toPhysicalRow(row))
    }
  })
  routerElem.$mount()
  td.appendChild(routerElem.$el)
  return td
}
