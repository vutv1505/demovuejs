import charUtil from './CharUtil'
import moment from 'moment'

export const TYPE_ERROR = 'エラー'
export const TYPE_WARNING = '警告'

export const PRE_CONDITION_COLUMN_VALUE_IN = 'col-val-in'

export const require = {
  validate(value) {
    return value != null && String(value).trim().length > 0
  },
  type: TYPE_ERROR,
  code: 'err-if-0002',
  message: () => '必須項目です。'
}

export const maxLength = {
  param: 0,
  validate(value) {
    return (
      value === null ||
      value === undefined ||
      String(value).trim().length <= this.param
    )
  },
  type: TYPE_ERROR,
  code: 'err-if-0003',
  message() {
    return `${this.param}桁以内で入力してください。`
  }
}

export const numeric = {
  validate(value) {
    let pattern = /^-?[0-9]*$/
    return value === null || value === undefined || pattern.test(value)
  },
  type: TYPE_ERROR,
  code: 'err-if-0004',
  message: () => '半角数字で入力してください。'
}

export const minValue = {
  param: 0,
  validate(value) {
    if (value === null || value === undefined) {
      return true
    }
    return value >= this.param
  },
  type: TYPE_ERROR,
  code: 'err-if-0005',
  message() {
    return `${this.param}以上の値で入力してください。`
  }
}

export const fixedLength = {
  param: 0,
  validate(value) {
    return value != null && String(value).trim().length === this.param
  },
  type: TYPE_ERROR,
  code: 'err-if-0006',
  message() {
    return `${this.param}文字で入力してください。`
  }
}

export const hankaku = {
  validate(value) {
    if (value === null || value === undefined) {
      return true
    }
    let result = charUtil.checkStrLenHarf(value)
    return !result.error
  },
  type: TYPE_ERROR,
  code: 'err-if-0007',
  message: () => '半角で入力してください。'
}

export const dateFormat = {
  param: 'YYYYMMDD',
  validate(value) {
    if (value === null || value === undefined) {
      return true
    }
    let pattern = /^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/
    return pattern.test(value)
  },
  type: TYPE_ERROR,
  code: 'err-if-0008',
  message() {
    return `${this.param}の形式で入力してください。`
  }
}

export const dateLenient = {
  param: 'YYYYMMDD',
  validate(value) {
    if (value === null || value === undefined) {
      return true
    }
    let date = moment(value, this.param)
    return date.isValid()
  },
  type: TYPE_ERROR,
  code: 'err-if-0009',
  message: () => '存在しない日付です。'
}

export const between = {
  param: [0, 9999],
  validate(value) {
    return (
      value === null ||
      value === undefined ||
      isNaN(value) ||
      (this.param[0] <= value && value <= this.param[1])
    )
  },
  type: TYPE_ERROR,
  code: 'err-if-0010',
  message() {
    return `${this.param[0]}から${this.param[1]}までの値で入力してください。`
  }
}

const validateTSVData = (tsvData, validateConfig) => {
  let errorList = []
  tsvData.forEach((row, lineNo) => {
    validateConfig.forEach(col => {
      // Validate for each cell
      const cellValue = row[col.columnName]

      for (const validateDef of col.validateFunctions) {
        let validateFunction = validateDef

        // Set props of validate function
        if (validateDef.function) {
          validateFunction = validateDef.function
          if (validateDef.type) {
            validateFunction.type = validateDef.type
          }
          if (validateDef.code) {
            validateFunction.code = validateDef.code
          }
          if (validateDef.param) {
            validateFunction.param = validateDef.param
          }
        }

        // Pre-condition process
        if (validateDef.preCondition) {
          if (validateDef.preCondition.type === PRE_CONDITION_COLUMN_VALUE_IN) {
            const otherColVal = row[validateDef.preCondition.columnName]
            if (!validateDef.preCondition.values.includes(otherColVal)) {
              continue
            }
          }
        }

        if (!validateFunction.validate(cellValue)) {
          errorList.push({
            エラー行: lineNo + 1,
            種別: validateFunction.type,
            コード: validateFunction.code,
            項目名: col.columnName,
            エラーメッセージ: validateFunction.message()
          })
        }
      }
    })
  })
  return errorList
}
export default validateTSVData
