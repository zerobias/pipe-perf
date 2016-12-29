'use strict'
const Bench = require('benchmark')
const log = require('humint')('tests')

const R = require('ramda')
const L = require('lodash')
const E = require('ensue')
const fpipe = require('function-pipe')
const fline = require('functional-pipeline')
const { compose } = require('redux')

const { enDev, reduxNoFilter, reduxFilter } = require('./ensue')

const { steps, randomData } = require('./test-data')


const [ st1, st2, st3, st4, st5, st6 ] = steps

const printmArgs = func => log`smoke test`((func(...steps)(randomData(), -5, 4)))
printmArgs(E)
printmArgs(L.flow)
printmArgs(enDev)
printmArgs(R.pipe)

const memoTests = {
  lodash    : L.flow(steps),
  ramda     : R.pipe(st1, st2, st3, st4, st5, st6),
  enDev     : enDev(steps),
  ensue     : E(steps),
  reduxWithF: reduxFilter(st6, st5, st4, st3, st2, st1),
  reduxNoF  : reduxNoFilter(st6, st5, st4, st3, st2, st1),
  fline     : fline(st1, st2, st3, st4, st5, st6),
  fpipe     : fpipe(steps),
}

const tests = {
  fline  : () => memoTests.fline,
  enDev  : () => memoTests.enDev,
  lodash : () => memoTests.lodash,
  fpipe  : () => memoTests.fpipe,
  ensue  : () => memoTests.ensue,
  ramda  : () => memoTests.ramda,
  reduxWF: () => memoTests.reduxWithF,
  reduxNF: () => memoTests.reduxNoF
}
const reduxTests = {
  lodash    : tests.lodash,
  ramda     : tests.ramda,
  eRed      : tests.enDev,
  ensue     : tests.ensue,
  reduxWithF: tests.reduxWF,
  reduxNoF  : tests.reduxNF
}


const opts = {
  minSamples: 300
}

const fastOpts = {
  minSamples: 50
}

const suiteFabric = (name, funcs, wrapper, conf = opts) => {
  const suite = new Bench.Suite(name)
  const funcsData = R.map(fn => wrapper(fn, randomData), funcs)
  const reducer = (currentSuite, [ name ]) => currentSuite
    .add(name, funcsData[name], conf)
  const creator = R.reduce(reducer, suite, R.toPairs(funcs))
  return creator
}

const fullWrap = (thunk, gen) => {
  const data = gen()
  return () => thunk()(data, -5, 4)
}
const curryWrap = memo => {
  const data = randomData()
  return () => memo(data, -5, 4)
}
const presets = {
  fullExpr : suiteFabric('full expression', tests, fullWrap ),
  curry    : suiteFabric('curried expression', memoTests, curryWrap ),
  reduxTest: suiteFabric('full redux', reduxTests, fullWrap, fastOpts )
}


module.exports = presets