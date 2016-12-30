'use strict'

const { Suite, benchPresets } = require('./bench')
const { standart } = require('./tests.js')

const test = Suite(benchPresets.full.fast)(standart)
test.run()

//TODO look at https://github.com/stoeffel/compose-function