import * as validateFunc from '../../../lib/validateTSV'
import { PRE_CONDITION_COLUMN_VALUE_IN } from '../../../lib/validateTSV'

export const validateScheduleArrivalConfig = [
  {
    columnName: '仕入先コード',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 6 },
      validateFunc.numeric
    ]
  },
  {
    columnName: 'OPOS発注番号',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 7 },
      validateFunc.numeric
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
    columnName: 'メーカー商品コード',
    validateFunctions: [
      {
        function: validateFunc.require,
        preCondition: {
          type: PRE_CONDITION_COLUMN_VALUE_IN,
          columnName: '仕入先コード',
          values: [
            '100110',
            '100111',
            '100120',
            '100121',
            '100140',
            '100141',
            '380110',
            '380111'
          ]
        }
      },
      { function: validateFunc.maxLength, param: 15 },
      validateFunc.hankaku
    ]
  },
  {
    columnName: '商品名',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 47 }
    ]
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
    columnName: '納品予定日',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.fixedLength, param: 8 },
      validateFunc.dateFormat,
      validateFunc.dateLenient
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
    columnName: '発注数',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 7 },
      validateFunc.numeric,
      validateFunc.minValue
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
    columnName: '出荷区分',
    validateFunctions: [
      { function: validateFunc.fixedLength, param: 1 },
      validateFunc.numeric
    ]
  },
  {
    columnName: 'トラック番号',
    validateFunctions: [
      { function: validateFunc.fixedLength, param: 1 },
      validateFunc.numeric
    ]
  },
  {
    columnName: '入目数',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 4 },
      validateFunc.numeric,
      { function: validateFunc.between, param: [0, 9999] }
    ]
  },
  {
    columnName: 'ケース数',
    validateFunctions: [
      validateFunc.require,
      { function: validateFunc.maxLength, param: 7 },
      validateFunc.numeric,
      validateFunc.minValue
    ]
  },
  {
    columnName: 'バラ数',
    validateFunctions: [
      { function: validateFunc.maxLength, param: 4 },
      validateFunc.numeric,
      validateFunc.minValue
    ]
  },
  {
    columnName: 'パレットケース',
    validateFunctions: [
      { function: validateFunc.maxLength, param: 7 },
      validateFunc.numeric,
      validateFunc.minValue
    ]
  },
  {
    columnName: 'MK製造記号',
    validateFunctions: [{ function: validateFunc.maxLength, param: 7 }]
  },
  {
    columnName: '充填日',
    validateFunctions: [
      { function: validateFunc.fixedLength, param: 8 },
      validateFunc.dateFormat,
      validateFunc.dateLenient
    ]
  },
  {
    columnName: '製造日',
    validateFunctions: [
      { function: validateFunc.fixedLength, param: 8 },
      validateFunc.dateFormat,
      validateFunc.dateLenient
    ]
  },
  {
    columnName: '使用期限',
    validateFunctions: [
      { function: validateFunc.fixedLength, param: 8 },
      validateFunc.dateFormat,
      validateFunc.dateLenient
    ]
  },
  {
    columnName: '予備項目',
    validateFunctions: [
      { function: validateFunc.maxLength, param: 19 },
      validateFunc.hankaku
    ]
  }
]
