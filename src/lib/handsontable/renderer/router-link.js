import CRouterLink from '@/components/common/CRouterLink'
import Vue from 'vue'
import Handsontable from 'handsontable'
import _ from 'lodash'

export default function(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.dom.empty(td)
  td.className = cellProperties.className
  const CRouterLinkClass = Vue.extend(CRouterLink)
  let targetValue = null
  if (cellProperties.routerConfig.targetCell == null) {
    targetValue = value
  } else {
    targetValue = instance.getSourceDataAtRow(row)[
      cellProperties.routerConfig.targetCell
    ]
  }
  const data = cellProperties.routerConfig.dataFactory
    ? cellProperties.routerConfig.dataFactory(instance.getSourceDataAtRow(row))
    : {}
  const routerElem = new CRouterLinkClass({
    propsData: {
      display: cellProperties.routerConfig.valueFormat
        ? cellProperties.routerConfig.valueFormat(value)
        : value,
      routerPath: cellProperties.routerConfig.routerPath,
      router: cellProperties.routerConfig.router,
      data: _.merge(data, { cellValue: targetValue }),
      param: cellProperties.routerConfig.paramFactory
        ? cellProperties.routerConfig.paramFactory(
            instance.getSourceDataAtRow(row)
          )
        : {},
      targetBlank: cellProperties.routerConfig.targetBlank
    }
  })
  routerElem.$mount()
  td.appendChild(routerElem.$el)
  return td
}
