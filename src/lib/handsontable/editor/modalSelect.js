import Handsontable from 'handsontable'

export default class ModalSelectEditor extends Handsontable.editors
  .SelectEditor {
  constructor(props) {
    super(props)
  }

  createElements() {
    Handsontable.dom.empty(this.TEXTAREA_PARENT)
  }

  open() {
    this.cellProperties.showModal(this.row, this.prop)
  }
}
