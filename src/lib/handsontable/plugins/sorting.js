import staticRegister from 'handsontable/es/utils/staticRegister'
const _staticRegister = staticRegister('sorting.compareFunctionFactory'),
  registerCompareFunctionFactory = _staticRegister.register

const isEmpty = function(variable) {
  return variable == null || variable === ''
}

const checkboxCompare = function(sortOrder, columnMeta, columnPluginSettings) {
  return (value, nextValue) => {
    const sortEmptyCells = columnPluginSettings.sortEmptyCells
    if (value === nextValue || (isEmpty(value) && isEmpty(nextValue))) {
      return 0
    }

    if (isEmpty(value)) {
      if (sortEmptyCells) {
        return sortOrder === 'asc' ? -1 : 1
      }
      return 1
    }

    if (isEmpty(nextValue)) {
      if (sortEmptyCells) {
        return sortOrder === 'asc' ? 1 : -1
      }

      return -1
    }

    if (value < nextValue) {
      return sortOrder === 'asc' ? -1 : 1
    }
    if (value > nextValue) {
      return sortOrder === 'asc' ? 1 : -1
    }
    return 0
  }
}

registerCompareFunctionFactory('checkbox', checkboxCompare)
