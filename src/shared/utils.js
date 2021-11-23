export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const _ = require('lodash')

export function combination(productPerGroup, currentCombinatoric = []) {
  if (!productPerGroup || productPerGroup.length === 0) {
    return [currentCombinatoric]
  }
  const result = []
  productPerGroup = _.cloneDeep(productPerGroup).filter(
    productList => productList && productList.length
  )
  const selectGroup = productPerGroup.shift()

  selectGroup.forEach(product => {
    result.push(
      ...combination(_.cloneDeep(productPerGroup), [
        ...currentCombinatoric,
        product
      ])
    )
  })
  return result
}
