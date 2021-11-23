export default {
  decimalFormat(value, maxLengthWholeNumberPart, maxLengthDecimalPart) {
    let pattern = new RegExp(
      `^\\d{1,${maxLengthWholeNumberPart}}(\\.\\d{1,${maxLengthDecimalPart}})?$`
    )
    return pattern.test(value)
  }
}
