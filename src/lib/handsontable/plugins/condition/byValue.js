import { condition } from 'handsontable/es/plugins/filters/condition/byValue'
import { registerCondition } from 'handsontable/es/plugins/filters/conditionRegisterer'

function createArrayAssertion(initialData) {
  let dataset = [...initialData]
  return function(value) {
    return dataset.some(item => item == value)
  }
}

registerCondition('by_value', condition, {
  name: 'By value',
  inputsCount: 0,
  inputValuesDecorator: function inputValuesDecorator(_ref3) {
    return [createArrayAssertion(_ref3[0])]
  },
  showOperators: false
})
