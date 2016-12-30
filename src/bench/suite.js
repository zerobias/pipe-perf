'use strict'
const log = require('humint')('bench')
const Bench = require('benchmark')
const R = require('ramda')

const Shuffle = require('./data-shuffle')
const { onCycle, complete } = require('./test-output')


function dataInjector(funcsMap, data, wrapper) {
  const dataShuffler = Shuffle(data)
  return R.map(fn => wrapper(fn, dataShuffler()), funcsMap)
}

const SuiteFabric = ({ benchName, wrapper, conf }) =>
  ({ testName, funcs, data }) => {
    const suite = new Bench.Suite(benchName)
    log`suite,bench,tests`(benchName, testName)
    const injectedFuncs = dataInjector(funcs, data, wrapper)

    const mapper = ([ name, func ]) => suite.add(name, func, conf)
    R.toPairs(injectedFuncs).forEach(mapper)

    suite
      .on('cycle', onCycle)
      .on('complete', complete)
    return suite
  }

module.exports = SuiteFabric