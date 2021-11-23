import Handsontable from 'handsontable'
import moment from 'moment'
import { outerHeight } from 'handsontable/es/helpers/dom/element'
import { isMetaKey } from 'handsontable/es/helpers/unicode'

export default class DatePickerEditor extends Handsontable.editors.DateEditor {
  constructor(props) {
    super(props)
  }

  showDatepicker(event) {
    this.$datePicker.config(this.getDatePickerConfig())
    const offset = this.TD.getBoundingClientRect()
    const dateFormat = this.cellProperties.dateFormat || this.defaultDateFormat
    const datePickerConfig = this.$datePicker.config()
    let dateStr
    const isMouseDown = this.instance.view.isMouseDown()
    const isMeta = event ? isMetaKey(event.keyCode) : false

    const dpClientWidth = 258
    const dpClientHeight = 230
    if (innerWidth - offset.left > dpClientWidth) {
      this.datePickerStyle.left = ''.concat(offset.left, 'px')
      if (
        offset.top < dpClientHeight ||
        (offset.top > dpClientHeight &&
          innerHeight - offset.bottom > dpClientHeight)
      ) {
        this.datePickerStyle.top = ''.concat(
          offset.top + outerHeight(this.TD),
          'px'
        )
        this.datePickerStyle.bottom = this.datePickerStyle.right = 'unset'
      }
      if (innerHeight - offset.bottom < dpClientHeight) {
        this.datePickerStyle.bottom = ''.concat(
          innerHeight - (offset.bottom - outerHeight(this.TD)),
          'px'
        )
        this.datePickerStyle.top = this.datePickerStyle.right = 'unset'
      }
    } else {
      this.datePickerStyle.right = ''.concat(innerWidth - offset.right, 'px')
      if (
        offset.top < dpClientHeight ||
        (offset.top > dpClientHeight &&
          innerHeight - offset.bottom > dpClientHeight)
      ) {
        this.datePickerStyle.top = ''.concat(
          offset.top + outerHeight(this.TD),
          'px'
        )
        this.datePickerStyle.bottom = this.datePickerStyle.left = 'unset'
      }
      if (innerHeight - offset.bottom < dpClientHeight) {
        this.datePickerStyle.bottom = ''.concat(
          innerHeight - (offset.bottom - outerHeight(this.TD)),
          'px'
        )
        this.datePickerStyle.top = this.datePickerStyle.left = 'unset'
      }
    }

    this.$datePicker._onInputFocus = function() {}

    datePickerConfig.format = dateFormat

    if (this.originalValue) {
      dateStr = this.originalValue

      if (moment(dateStr, dateFormat, true).isValid()) {
        this.$datePicker.setMoment(moment(dateStr, dateFormat), true)
      }

      if (this.getValue() !== this.originalValue) {
        this.setValue(this.originalValue)
      }

      if (!isMeta && !isMouseDown) {
        this.setValue('')
      }
    } else if (this.cellProperties.defaultDate) {
      dateStr = this.cellProperties.defaultDate
      datePickerConfig.defaultDate = dateStr

      if (moment(dateStr, dateFormat, true).isValid()) {
        this.$datePicker.setMoment(moment(dateStr, dateFormat), true)
      }

      if (!isMeta && !isMouseDown) {
        this.setValue('')
      }
    } else {
      this.$datePicker.gotoToday()
    }

    this.datePickerStyle.display = 'block'
    this.$datePicker.show()
  }
}
