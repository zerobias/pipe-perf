'use strict'
const log = require('humint')('tests')

const R = require('ramda')
const L = require('lodash')
const E = require('ensue')
const fpipe = require('function-pipe')
const fline = require('functional-pipeline')
const { compose } = require('redux')

const { enDev, reduxNoFilter, reduxFilter } = require('./ensue')

const { steps, data } = require('./test-data')
// const Bench = require('./bench')

const [ st1, st2, st3, st4, st5, st6 ] = steps

const smokeTest = func => log`smoke test`((func(...steps)(data, -5, 4)))
smokeTest(E)
smokeTest(L.flow)
smokeTest(enDev)
smokeTest(R.pipe)

const memoizedTests = {
  fline     : fline(st1, st2, st3, st4, st5, st6),
  lodash    : L.flow(steps),
  ramda     : R.pipe(st1, st2, st3, st4, st5, st6),
  enDev     : enDev(steps),
  fpipe     : fpipe(steps),
  ensue     : E(steps),
  reduxWithF: reduxFilter(st6, st5, st4, st3, st2, st1),
  reduxNoF  : reduxNoFilter(st6, st5, st4, st3, st2, st1),
}

const fullTests = {
  fline  : () => fline(st1, st2, st3, st4, st5, st6),
  lodash : () => L.flow(steps),
  ramda  : () => R.pipe(st1, st2, st3, st4, st5, st6),
  enDev  : () => enDev(steps),
  fpipe  : () => fpipe(steps),
  ensue  : () => E(steps),
  reduxWF: () => reduxFilter(st6, st5, st4, st3, st2, st1),
  reduxNF: () => reduxNoFilter(st6, st5, st4, st3, st2, st1)
}
const reduxFull = {
  lodash    : fullTests.lodash,
  ramda     : fullTests.ramda,
  enDev     : fullTests.enDev,
  ensue     : fullTests.ensue,
  reduxWithF: fullTests.reduxWF,
  reduxNoF  : fullTests.reduxNF
}


const standart = {
  testName: '6 step redux full',
  funcs   : reduxFull,
  data
}


module.exports = { standart }