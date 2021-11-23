import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import charUtil from './CharUtil'
import { numberFormat } from './format'
import validateCheckUtil from './validateCheckUtil'

// Vue.use(VeeValidate, { events: '' }) // リアルタイムバリデーション殺し
// Vue.use(VeeValidate)

export const customMessage = {
  ja: {
    messages: {
      required: fieldname => {
        return '必須項目です'
      },
      required_if: (fieldname, param) => {
        if (param == 'oroshisakiflg,false')
          return `新規卸先と同じでない場合は必須項目です`
      },
      min_value: (fieldName, param) =>
        `${fieldName}は${param}より大きい数値を入力してください。`,
      max_value: (fieldName, param) => `最大値は${param}です`,
      min: (fieldName, param) =>
        `最小文字数は${numberFormat(param[0])}文字です`,
      max: (fieldName, param) =>
        `最大文字数は${numberFormat(param[0])}文字です`,
      decimalFormat: (fieldName, param) =>
        `小数は${numberFormat(param[1])}桁までで入力してください`,
      numeric: '半角数字で入力してください',
      decimal: '小数点含む数字を入力してください',
      before: '不正な範囲です',
      after: '不正な範囲です',
      date_format: (fieldName, param) => `${param}の形式で入力してください`,
      between: (fieldName, param) =>
        `${param[0]}から${param[1]}の間の数字で入力してください`,
      onlyOneOfTwo: (fieldName, otherFieldName) =>
        `${fieldName.replace(
          /<span.*?<\/span>/,
          ''
        )}、${otherFieldName}のいずれかを入力してください`,
      afterDate: (fieldName, otherFieldName) => `範囲が不正です`,
      beforeDate: (fieldName, otherFieldName) => `範囲が不正です`,
      sameOrAfterDate: (fieldName, otherFieldName) => `範囲が不正です`,
      sameOrBeforeDate: (fieldName, otherFieldName) => `範囲が不正です`,
      afterDate6Month: (fieldName, otherFieldName) => `範囲が不正です`,
      beforeDate6Month: (fieldName, otherFieldName) => `範囲が不正です`,
      email: fieldName => `不正な形式です`,
      greater: (fieldName, otherFieldName) => `不正な値です`,
      smaller: (fieldName, otherFieldName) => `不正な値です`,
      greaterOrEqual: (fieldName, otherFieldName) => `不正な値です`,
      smallerOrEqual: (fieldName, otherFieldName, message) =>
        message ? message : `不正な値です`,
      validTelNo: '正しい形式（例：03-1234-5678）で入力してください',
      validPostcode: '正しい形式で入力してください',
      alpha_num: '半角英数字で入力してください',
      requiredLength: (fieldName, param) => `${param}文字で入力してください`,
      charRequiredLength: (fieldName, param) =>
        `${fieldName}は${param}文字で入力してください。`,
      numberRequiredLength: (fieldName, param) =>
        `${fieldName}は${param}桁で入力してください。`,
      smallerNowAndFutureDate: '範囲が不正です',
      maxLengthFileName: (fieldName, param) =>
        `最大文字数は${numberFormat(param[0])}です`,
      bytemaxlength: (fieldName, param) =>
        `最大文字数は${numberFormat(param[0])}文字です`,
      length: (fieldName, param) =>
        `${fieldName}は${param}桁で入力してください。`
    }
  }
}

Validator.localize(customMessage)
Validator.localize('ja')
// カスタムバリデーション
// 電話番号チェック(ハイフンはあってもなくても良い)
Validator.extend('telno', {
  getMessage: () => `正しい形式（例：03-1234-5678）で入力してください`,
  validate(val) {
    // 7桁の数字か999-9999の形式の場合
    if (
      val.match(
        /^(0[0-9]-[0-9]{4}-[0-9]{4}|0[0-9]{2}-[0-9]{3}-[0-9]{4}|0[0-9]{3}-[0-9]{2}-[0-9]{4}|0[0-9]{4}-[0-9]-[0-9]{4}|0[0-9]{3}-[0-9]{3}-[0-9]{3}|0[0-9]{2}-[0-9]{4}-[0-9]{4})$/g
      )
    ) {
      return true
    }
    // それ以外はバリデーションエラー
    return false
  }
})
// 郵便番号チェック(ハイフンはあってもなくても良い)
Validator.extend('postcode', {
  getMessage: () => `正しい形式で入力してください`,
  validate(val) {
    // 7桁の数字か999-9999の形式の場合
    if (val.match(/^\d{3}-?\d{4}$/g)) {
      return true
    }
    // それ以外はバリデーションエラー
    return false
  }
})
// 金額チェック
Validator.extend('checkPrice', {
  getMessage: () => '半角数字で入力してください',
  validate(val) {
    const price = String(val)
      .split(',')
      .join('')
    if (price.match(/^[0-9]+$/)) {
      return true
    }
    // それ以外はバリデーションエラー
    return false
  }
})
Validator.extend('katakana', {
  getMessage: () => 'カタカナで入力してください',
  validate(value) {
    let result = charUtil.checkKatakana(value)
    return !result.error
  }
})
Validator.extend('zenkakuKatakana', {
  // getMessage: () => `${field}は全角カナ文字列を入力してください`,
  getMessage: () => '全角カナで入力してください',
  validate(value) {
    let result = charUtil.checkZenKataStr(value)
    return !result.error
  }
})
Validator.extend('hankakuKatakana', {
  getMessage: () => '半角カナで入力してください。',
  validate(value) {
    let result = charUtil.checkHanKataStr(value)
    return !result.error
  }
})
// 全角文字チェック
Validator.extend('zenkaku', {
  getMessage: () => '全角で入力してください。',
  validate(value) {
    let result = charUtil.checkStrLenFull(value)
    return !result.error
  }
})
// 半角文字チェック
Validator.extend('hankaku', {
  getMessage: () => '半角で入力してください。',
  validate(value) {
    let result = charUtil.checkStrLenHarf(value)
    return !result.error
  }
})
// 件数チェック
Validator.extend('numberCount', {
  getMessage: () => '不正な数値が入力されています。',
  validate(value) {
    let pattern = /^([1-9][0-9]{0,2}|0)(\.[0-9]{1,2})?$/
    return pattern.test(value)
  }
})
// 半角数字、ハイフンチェック
Validator.extend('num_hyphen', {
  getMessage: () => '入力内容に半角数字、ハイフン以外が含まれています。',
  validate(value) {
    let pattern = /^[0-9-]+$/
    return pattern.test(value)
  }
})

Validator.extend(
  'decimalFormat',
  (
    value,
    [maxLengthWholeNumberPart, maxLengthDecimalPart, negativeValue = false]
  ) => {
    if (!negativeValue) {
      return validateCheckUtil.decimalFormat(
        value,
        maxLengthWholeNumberPart,
        maxLengthDecimalPart
      )
    } else {
      return validateCheckUtil.decimalFormat(
        value < 0 ? parseInt(value.toString().replace('-', '')) : value,
        maxLengthWholeNumberPart,
        maxLengthDecimalPart
      )
    }
  }
)

Validator.extend(
  'onlyOneOfTwo',
  (value, [otherValue]) => {
    return !(
      value != null &&
      otherValue != null &&
      String(value).trim().length &&
      String(otherValue).trim().length
    )
  },
  {
    hasTarget: true
  }
)

Validator.extend(
  'afterDate',
  (value, [otherValue]) => {
    if (
      value != null &&
      String(value).trim().length > 0 &&
      otherValue != null &&
      String(otherValue).trim().length > 0
    ) {
      value = typeof value === 'string' ? new Date(value) : value
      otherValue =
        typeof otherValue === 'string' ? new Date(otherValue) : otherValue
      return value > otherValue
    } else {
      return true
    }
  },
  {
    hasTarget: true
  }
)

Validator.extend(
  'beforeDate',
  (value, [otherValue]) => {
    if (
      value != null &&
      String(value).trim().length > 0 &&
      otherValue != null &&
      String(otherValue).trim().length > 0
    ) {
      value = typeof value === 'string' ? new Date(value) : value
      otherValue =
        typeof otherValue === 'string' ? new Date(otherValue) : otherValue
      return value < otherValue
    } else {
      return true
    }
  },
  {
    hasTarget: true
  }
)

Validator.extend(
  'sameOrAfterDate',
  (value, [otherValue]) => {
    if (
      value != null &&
      String(value).trim().length > 0 &&
      otherValue != null &&
      String(otherValue).trim().length > 0
    ) {
      value = typeof value === 'string' ? new Date(value) : value
      otherValue =
        typeof otherValue === 'string' ? new Date(otherValue) : otherValue
      return value >= otherValue
    } else {
      return true
    }
  },
  {
    hasTarget: true
  }
)

Validator.extend(
  'sameOrBeforeDate',
  (value, [otherValue]) => {
    if (
      value != null &&
      String(value).trim().length > 0 &&
      otherValue != null &&
      String(otherValue).trim().length > 0
    ) {
      value = typeof value === 'string' ? new Date(value) : value
      otherValue =
        typeof otherValue === 'string' ? new Date(otherValue) : otherValue
      return value <= otherValue
    } else {
      return true
    }
  },
  {
    hasTarget: true
  }
)

Validator.extend('alphaNumeric', {
  getMessage: () => '英数字で入力してください',
  validate(value) {
    let pattern = /^[0-9a-zA-Z]*$/
    return pattern.test(value)
  }
})

Validator.extend(
  'greater',
  (value, [otherValue]) => {
    if (
      value != null &&
      String(value).trim().length > 0 &&
      otherValue != null &&
      String(otherValue).trim().length > 0
    ) {
      return parseInt(value) > parseInt(otherValue)
    } else {
      return true
    }
  },
  {
    hasTarget: true
  }
)

Validator.extend(
  'greaterOrEqual',
  (value, [otherValue]) => {
    if (
      value != null &&
      String(value).trim().length > 0 &&
      otherValue != null &&
      String(otherValue).trim().length > 0
    ) {
      return parseInt(value) >= parseInt(otherValue)
    } else {
      return true
    }
  },
  {
    hasTarget: true
  }
)

Validator.extend(
  'smallerOrEqual',
  (value, [otherValue]) => {
    if (
      value != null &&
      String(value).trim().length > 0 &&
      otherValue != null &&
      String(otherValue).trim().length > 0
    ) {
      return parseInt(value) <= parseInt(otherValue)
    } else {
      return true
    }
  },
  {
    hasTarget: true
  }
)

Validator.extend(
  'smaller',
  (value, [otherValue]) => {
    if (
      value != null &&
      String(value).trim().length > 0 &&
      otherValue != null &&
      String(otherValue).trim().length > 0
    ) {
      return parseInt(value) < parseInt(otherValue)
    } else {
      return true
    }
  },
  {
    hasTarget: true
  }
)

Validator.extend('requiredLength', (value, [lengthValue]) => {
  if (value != null && String(value).trim().length > 0) {
    return parseInt(String(value).trim().length) === parseInt(lengthValue)
  } else {
    return true
  }
})

Validator.extend('charRequiredLength', (value, [lengthValue]) => {
  if (value != null && String(value).trim().length > 0) {
    return parseInt(String(value).trim().length) === parseInt(lengthValue)
  } else {
    return true
  }
})

Validator.extend('numberRequiredLength', (value, [lengthValue]) => {
  if (value != null && String(value).trim().length > 0) {
    return parseInt(String(value).trim().length) === parseInt(lengthValue)
  } else {
    return true
  }
})

Validator.extend('smallerNowAndFutureDate', value => {
  if (value != null && String(value).trim().length > 0) {
    value = typeof value === 'string' ? new Date(value) : value
    const today = new Date()
    return value.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)
  } else {
    return true
  }
})

Validator.extend('maxLengthFileName', (value, [lengthValue]) => {
  if (value != null && String(value).trim().length > 0) {
    return parseInt(value.name.length) <= parseInt(lengthValue)
  } else {
    return true
  }
})

Validator.extend('bytemaxlength', (value, [lengthValue]) => {
  var charcount = function(str) {
    let len = 0
    str = escape(str)
    for (let i = 0; i < str.length; i++, len++) {
      if (str.charAt(i) == '%') {
        if (str.charAt(++i) == 'u') {
          i += 3
          len++
        }
        i++
      }
    }
    return len
  }
  if (value != null && String(value).trim().length > 0) {
    return charcount(value) <= parseInt(lengthValue)
  } else {
    return true
  }
})

Validator.extend(
  'afterDate6Month',
  (value, [otherValue]) => {
    if (
      value != null &&
      String(value).trim().length > 0 &&
      otherValue != null &&
      String(otherValue).trim().length > 0
    ) {
      value = typeof value === 'string' ? new Date(value) : value
      otherValue =
        typeof otherValue === 'string' ? new Date(otherValue) : otherValue
      return value <= otherValue.setMonth(otherValue.getMonth() + 6)
    } else {
      return true
    }
  },
  {
    hasTarget: true
  }
)

Validator.extend(
  'beforeDate6Month',
  (value, [otherValue]) => {
    if (
      value != null &&
      String(value).trim().length > 0 &&
      otherValue != null &&
      String(otherValue).trim().length > 0
    ) {
      value = typeof value === 'string' ? new Date(value) : value
      otherValue =
        typeof otherValue === 'string' ? new Date(otherValue) : otherValue
      return value >= otherValue.setMonth(otherValue.getMonth() - 6)
    } else {
      return true
    }
  },
  {
    hasTarget: true
  }
)

Validator.extend('numericWithComma', {
  getMessage: field => '半角数字で入力してください',
  validate: value => {
    let pattern = /^([0-9]+)$/
    return pattern.test(String(value).replace(',', ''))
  }
})

Validator.extend(
  'smallerOrEqualWithComma',
  {
    getMessage: (field, otherField) => {
      return `${otherField}を超える${field}の登録はできません。`
    },
    validate: (value, [otherValue]) => {
      if (
        value != null &&
        String(value).trim().length > 0 &&
        otherValue != null &&
        String(otherValue).trim().length > 0
      ) {
        return (
          parseInt(String(value).replace(',', '')) <=
          parseInt(String(otherValue).replace(',', ''))
        )
      } else {
        return true
      }
    }
  },
  {
    hasTarget: true
  }
)
