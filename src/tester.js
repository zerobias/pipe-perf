'use strict'
// const Bench = require('benchmark')
const Logger = require('humint')
const log = Logger('tester')

const presets = require('./tests')
const stats = require('./stats')


const onCycle = event => console.log(String(event.target))

const statLog = ({ name, boost: { full, gap } }) =>
  log('boost', name)(`Full/gap\t${full}/${gap} %`)

const complete = function() {
  const fastest = this.filter('fastest').map('name')
  log`Fastest`(fastest)
  const medians = stats(this)
  medians.forEach(statLog)
  return medians
}

const tests = {
  full: presets.fullExpr
    .on('cycle', onCycle)
    .on('complete', complete),
  curry: presets.curry
    .on('cycle', onCycle)
    .on('complete', complete),
  redux: presets.reduxTest
    .on('cycle', onCycle)
    .on('complete', complete)
}

module.exports = tests