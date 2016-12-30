const log = require('humint')('test')
const stats = require('./stats')

const onCycle = event => log`cycle end`(String(event.target))

const statLog = ({ name, boost: { full, gap } }) =>
  log('boost', 'full/gap')(`${full}/${gap} % ${name}`)

const complete = function() {
  const fastest = this.filter('fastest').map('name')
  log`Fastest`(fastest)
  const medians = stats(this)
  medians.forEach(statLog)
  return medians
}

module.exports = { onCycle, complete }