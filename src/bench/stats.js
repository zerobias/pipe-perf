'use strict'

const R = require('ramda')
const E = require('ensue')

const getSample = R.path(['stats', 'sample'])
const roundMedian = e => Math.round(e*1e7)

const countMedian = E( getSample, R.median, roundMedian )

const percentDiff = (val1, val2) => +(((val1 - val2)/val1)*100).toFixed(2)
const compare = (last, next) => -percentDiff(last[1], next[1])
const sort = R.sort(compare)


const medianMapper = bench =>
  [ bench.name, countMedian(bench) ]

const countBoost = list => {
  const sorted = sort(list)
  const [ , min ] = sorted[0]
  const minMax = { min, past: min }
  const red = (acc, [ name, stat ]) => {
    const boost = {
      full: percentDiff(minMax.min, stat),
      gap : percentDiff(minMax.past, stat)
    }
    minMax.past = stat
    const single = { name, boost }
    return R.append(single, acc)
  }
  return R.reduce(red, [], sorted)
}

const fullCount = suite => {
  const benchs = suite.map(medianMapper)
  const results = countBoost(benchs)
  return results
}

module.exports = fullCount