'use strict'

const Suite = require('./suite')

const opts = {
  minSamples: 300
}

const fastOpts = {
  minSamples: 50
}

const wrap = { //TODO make wrappers with unique but pregenerated data on every call
  justCall: (fn, data) => () => fn(data, -5, 4),
  reThunk : (thunk, data) => () => thunk()(data, -5, 4)
}

const benchPresets = {
  full: {
    fast: {
      benchName: 'full fast',
      wrapper  : wrap.reThunk,
      conf     : fastOpts
    },
    strong: {
      benchName: 'full strong',
      wrapper  : wrap.reThunk,
      conf     : opts
    }
  },
  memoized: {
    fast: {
      benchName: 'memoized fast',
      wrapper  : wrap.reThunk,
      conf     : fastOpts
    },
    strong: {
      benchName: 'memoized strong',
      wrapper  : wrap.reThunk,
      conf     : opts
    }
  }
}

module.exports = { Suite, benchPresets }