'use strict'
const R = require('ramda')

function v2Bab() {
  for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
    data[_key] = arguments[_key]
  }
  return R.apply(R.pipe, R.flatten(data))
}

function v2Orig(...data) {
  return R.apply(R.pipe, R.flatten(data))
}

module.exports = { v2Bab, v2Orig }