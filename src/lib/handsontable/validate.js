import validateCheckUtil from '../validateCheckUtil'
import moment from 'moment'
import _ from 'lodash'
import { Validator as VeeValidator } from 'vee-validate'
import { customMessage } from '../validate'
export const runCallback = (isValid, callBack, colSetting, context) => {
  colSetting.errors = colSetting.errors || {}
  if (context) {
    if (isValid) {
      Object.keys(context).forEach(
        validate => delete colSetting.errors[validate]
      )
    } else {
      _.merge(colSetting.errors, context)
    }
  }
  callBack(isValid)
}
const getColHeader = col =>
  function getColHeader(mapColumn) {
    const colConfig = mapColumn[col]
    return colConfig ? colConfig.colHeader : ''
  }
export const getMessage = (rule, mapColumns, fieldName, ...context) => {
  let messageFactory
  if (context[0] && context[0].message) {
    messageFactory = context[0].message
  } else if (context) {
    messageFactory = customMessage[VeeValidator.locale].messages[rule]
    context = context.map(param => {
      if (param && param.name === 'getColHeader') {
        return param(mapColumns)
      } else {
        return param
      }
    })
  }
  if (typeof messageFactory === 'function') {
    return messageFactory(fieldName, context)
  } else {
    return messageFactory
  }
}
export const Validator = {
  compose(...rules) {
    return function(value, isValid, _this = this) {
      let result = true
      for (let rule of rules) {
        rule(
          value,
          valid => {
            if (!valid) {
              result = false
            }
          },
          _this
        )
      }
      runCallback(result, isValid, _this)
    }
  },
  max(length = 1) {
    return function max(value, isValid, _this = this) {
      let val
      if (typeof value === 'number' && value < 0) {
        val = Math.abs(value)
      } else {
        val = value
      }
      const result = !(val != null && String(val).trim().length > length)
      runCallback(result, isValid, _this, { max: length })
    }
  },
  minusNumeric() {
    return function numeric(value, isValid, _this = this) {
      let result
      if (value != null && String(value).trim().length > 0) {
        result = /^(-[0-9]+$|0)/.test(value)
      } else {
        result = true
      }
      runCallback(result, isValid, _this, { numeric: false })
    }
  },
  max_value(max_value) {
    return function max_value(value, isValid, _this = this) {
      const result = !(value != null && Number(value) > Number(max_value))
      runCallback(result, isValid, _this, { max_value: Number(max_value) })
    }
  },
  numeric() {
    return function numeric(value, isValid, _this = this) {
      let result
      if (value != null && String(value).trim().length > 0) {
        result = /^[0-9]+$/.test(value)
      } else {
        result = true
      }
      runCallback(result, isValid, _this, { numeric: false })
    }
  },
  validTelNo() {
    return function validTelNo(value, isValid, _this = this) {
      let result
      if (
        value != null &&
        String(value).trim().length <= 15 &&
        String(value).trim().length > 0
      ) {
        result = /^(0[0-9]-[0-9]{4}-[0-9]{4}|0[0-9]{2}-[0-9]{3}-[0-9]{4}|0[0-9]{3}-[0-9]{2}-[0-9]{4}|0[0-9]{4}-[0-9]-[0-9]{4}|0[0-9]{3}-[0-9]{3}-[0-9]{3}|0[0-9]{2}-[0-9]{4}-[0-9]{4})$/.test(
          value
        )
      } else {
        result = true
      }
      runCallback(result, isValid, _this, { validTelNo: false })
    }
  },
  validPostcode() {
    return function validTelNo(value, isValid, _this = this) {
      let result
      if (value != null && String(value).trim().length > 0) {
        result = /^\d{3}-?\d{4}$/g.test(value)
      } else {
        result = true
      }
      runCallback(result, isValid, _this, { validPostcode: false })
    }
  },
  decimalFormat(maxLengthWholeNumberPart, maxLengthDecimalPart) {
    return function decimalFormat(value, isValid, _this = this) {
      const result = !(
        value != null &&
        String(value).trim().length > 0 &&
        !validateCheckUtil.decimalFormat(
          value,
          maxLengthWholeNumberPart,
          maxLengthDecimalPart
        )
      )
      runCallback(result, isValid, _this, {
        decimalFormat: [maxLengthWholeNumberPart, maxLengthDecimalPart]
      })
    }
  },
  onlyOneOfTwo(refFieldName) {
    return function onlyOneOfTwo(value, isValid, _this = this) {
      _this.visualRow = _this.instance.toVisualRow(_this.row)
      const refValue = _this.instance.getDataAtRowProp(
        _this.visualRow,
        refFieldName
      )
      const result = !(
        value != null &&
        refValue != null &&
        String(value).trim().length &&
        String(refValue).trim().length
      )
      runCallback(result, isValid, _this, {
        onlyOneOfTwo: getColHeader(refFieldName)
      })
    }
  },
  between(min, max) {
    return function between(value, isValid, _this = this) {
      let result
      if (value != null && String(value).trim().length > 0) {
        result = value >= min && value <= max
      } else {
        result = true
      }
      runCallback(result, isValid, _this, { between: [min, max] })
    }
  },
  between_akaSuuryou(min, max, message) {
    return function between(value, isValid, _this = this) {
      let result
      if (value != null && String(value).trim().length > 0) {
        result = Number(value) >= min && Number(value) <= max
      } else {
        result = true
      }
      runCallback(result, isValid, _this, {
        between: message ? { message } : [min, max]
      })
    }
  },
  beforeDate(refFieldName, formatDate = 'YYYY/MM/DD') {
    return function beforeDate(value, isValid, _this = this) {
      _this.visualRow = _this.instance.toVisualRow(_this.row)
      const refValue = _this.instance.getDataAtRowProp(
        _this.visualRow,
        refFieldName
      )
      let result
      if (
        value != null &&
        String(value).trim().length > 0 &&
        refValue != null &&
        String(refValue).trim().length > 0
      ) {
        result = moment(value, formatDate).isBefore(
          moment(refValue, formatDate)
        )
      } else {
        result = true
      }
      runCallback(result, isValid, _this, {
        beforeDate: [getColHeader(refFieldName), formatDate]
      })
    }
  },
  sameOrBeforeDate(refFieldName, formatDate = 'YYYY/MM/DD') {
    return function sameOrBeforeDate(value, isValid, _this = this) {
      _this.visualRow = _this.instance.toVisualRow(_this.row)
      const refValue = _this.instance.getDataAtRowProp(
        _this.visualRow,
        refFieldName
      )
      let result
      if (
        value != null &&
        String(value).trim().length > 0 &&
        refValue != null &&
        String(refValue).trim().length > 0
      ) {
        result = moment(value, formatDate).isSameOrBefore(
          moment(refValue, formatDate)
        )
      } else {
        result = true
      }
      runCallback(result, isValid, _this, {
        sameOrBeforeDate: [getColHeader(refFieldName), formatDate]
      })
    }
  },
  smallerOrEqual(refFieldName, message) {
    return function smallerOrEqual(value, isValid, _this = this) {
      let result
      let refValue
      if (typeof refFieldName === 'function') {
        refValue = refFieldName(_this)
      } else {
        _this.visualRow = _this.instance.toVisualRow(_this.row)
        refValue = _this.instance.getDataAtRowProp(
          _this.visualRow,
          refFieldName
        )
      }
      if (
        value != null &&
        String(value).trim().length > 0 &&
        refValue != null &&
        String(refValue).trim().length > 0
      ) {
        result = value <= refValue
      } else {
        result = true
      }
      runCallback(result, isValid, _this, {
        smallerOrEqual: message ? { message } : [getColHeader(refFieldName)]
      })
    }
  },
  greaterOrEqual(refFieldName) {
    return function greaterOrEqual(value, isValid, _this = this) {
      _this.visualRow = _this.instance.toVisualRow(_this.row)
      const refValue = _this.instance.getDataAtRowProp(
        _this.visualRow,
        refFieldName
      )
      let result
      if (
        value != null &&
        String(value).trim().length > 0 &&
        refValue != null &&
        String(refValue).trim().length > 0
      ) {
        result = value >= refValue
      } else {
        result = true
      }
      runCallback(result, isValid, _this, {
        greaterOrEqual: [getColHeader(refFieldName)]
      })
    }
  },
  greater(refFieldName) {
    return function greater(value, isValid, _this = this) {
      _this.visualRow = _this.instance.toVisualRow(_this.row)
      const refValue = _this.instance.getDataAtRowProp(
        _this.visualRow,
        refFieldName
      )
      let result
      if (
        value != null &&
        String(value).trim().length > 0 &&
        refValue != null &&
        String(refValue).trim().length > 0
      ) {
        result = value >= refValue
      } else {
        result = true
      }
      runCallback(result, isValid, _this, {
        greater: [getColHeader(refFieldName)]
      })
    }
  },
  afterDate(refFieldName, formatDate = 'YYYY/MM/DD') {
    return function afterDate(value, isValid, _this = this) {
      _this.visualRow = _this.instance.toVisualRow(_this.row)
      const refValue = _this.instance.getDataAtRowProp(
        _this.visualRow,
        refFieldName
      )
      let result
      if (
        value != null &&
        String(value).trim().length > 0 &&
        refValue != null &&
        String(refValue).trim().length > 0
      ) {
        result = moment(value, formatDate).isAfter(moment(refValue, formatDate))
      } else {
        result = true
      }
      runCallback(result, isValid, _this, {
        afterDate: [getColHeader(refFieldName)]
      })
    }
  },
  sameOrAfterDate(refFieldName, formatDate = 'YYYY/MM/DD') {
    return function sameOrAfterDate(value, isValid, _this = this) {
      _this.visualRow = _this.instance.toVisualRow(_this.row)
      const refValue = _this.instance.getDataAtRowProp(
        _this.visualRow,
        refFieldName
      )
      let result
      if (
        value != null &&
        String(value).trim().length > 0 &&
        refValue != null &&
        String(refValue).trim().length > 0
      ) {
        result = moment(value, formatDate).isSameOrAfter(
          moment(refValue, formatDate)
        )
      } else {
        result = true
      }
      runCallback(result, isValid, _this, {
        sameOrAfterDate: [getColHeader(refFieldName)]
      })
    }
  },
  required() {
    return function required(value, isValid, _this = this) {
      const result = value != null && String(value).trim().length > 0
      runCallback(result, isValid, _this, { required: false })
    }
  },
  if(condition, ...rules) {
    const compose = this.compose
    return function(value, isValid, _this = this) {
      if (condition(_this.instance.getSourceDataAtRow(_this.row))) {
        compose(...rules)(value, valid => isValid(valid), _this)
      } else {
        runCallback(
          true,
          isValid,
          _this,
          rules.reduce((context, rule) => {
            context[rule.name] = true
            return context
          }, {})
        )
      }
    }
  },
  requiredLength(length = 1) {
    return function requiredLength(value, isValid, _this = this) {
      const result = value != null && String(value).trim().length === length
      runCallback(result, isValid, _this, { requiredLength: length })
    }
  },
  date_format(formatDate = 'YYYY/MM/DD') {
    return function date_format(value, isValid, _this = this) {
      let result
      if (value != null && String(value).trim().length > 0) {
        result = moment(value, formatDate, true).isValid()
      } else {
        result = true
      }
      runCallback(result, isValid, _this, { date_format: formatDate })
    }
  },
  min_value(minValue = 0) {
    return function min_value(value, isValid, _this = this) {
      let result
      if (value != null && String(value).trim().length > 0) {
        result = value >= minValue
      } else {
        result = true
      }
      runCallback(result, isValid, _this, { min_value: minValue })
    }
  }
}
