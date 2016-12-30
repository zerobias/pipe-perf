'use strict'

const randomIndex = range => Math.round(Math.random()*range)

function* shuffle(input) {
  const ln = input.length-1
  while (true) {
    const result = [],
          temp = [...input]
    for (let i = ln; i >= 0; i--) {
      const index = randomIndex(i)
      result.push(temp[index])
      temp.splice(index, 1)
    }
    yield result
  }
}

/**
 * Generates random array based on the original on every call
 * @template T
 * @param {T[]} list Source list
 * @return {function():T[]}
 */
function Shuffle(list) {
  const generator = shuffle(list)
  return () => generator.next().value
}

module.exports = Shuffle