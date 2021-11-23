import * as validateFunc from '../../../lib/validateTSV'

export const validateArrivalRecordConfig = [
  {
    columnName: 'FORCE発注番号',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 8 },
      validateFunc.numeric,
      validateFunc.minValue
    ]
  },
  {
    columnName: 'OPOS発注番号',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 8 },
      validateFunc.numeric,
      validateFunc.minValue
    ]
  },
  {
    columnName: '出荷番号',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 8 },
      validateFunc.numeric,
      validateFunc.minValue
    ]
  },
  {
    columnName: '取引区分',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.fixedLength, param: 1 },
      validateFunc.numeric
    ]
  },
  {
    columnName: '仕入先コード',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 6 },
      validateFunc.numeric
    ]
  },
  {
    columnName: '仕入先名',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 26 }
    ]
  },
  {
    columnName: '商品番号',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 6 },
      validateFunc.hankaku
    ]
  },
  {
    columnName: '商品名',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 7 }
    ]
  },
  {
    columnName: '入荷予定日',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.fixedLength, param: 8 },
      validateFunc.dateFormat,
      validateFunc.dateLenient
    ]
  },
  {
    columnName: '入出庫日',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.fixedLength, param: 8 },
      validateFunc.dateFormat,
      validateFunc.dateLenient
    ]
  },
  {
    columnName: '入荷予定数',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 7 },
      validateFunc.numeric,
      validateFunc.minValue
    ]
  },
  {
    columnName: '入出庫数',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 7 },
      validateFunc.numeric,
      validateFunc.minValue
    ]
  },
  {
    columnName: '単価',
    validateFunctions: [validateFunc.require]
  },
  {
    columnName: '商品品質',
    validateFunctions: [validateFunc.require]
  },
  {
    columnName: '入出庫状態',
    validateFunctions: [validateFunc.require]
  },
  {
    columnName: '納品先コード',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 6 },
      validateFunc.numeric
    ]
  },
  {
    columnName: '納品先名',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 26 }
    ]
  },
  {
    columnName: '仕入返品理由',
    validateFunctions: [validateFunc.require]
  },
  {
    columnName: 'メーカー商品コード',
    validateFunctions: [
      { function: validateFunc.maxLength, param: 10 },
      validateFunc.hankaku
    ]
  }
]
