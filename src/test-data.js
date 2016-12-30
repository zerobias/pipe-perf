'use strict'

const data = [ 0, 10, 33, '58', 30e2, -Infinity, NaN, null, 'abc', '-2e2' ]


const steps = [
  (list, val1=0, val2=0) => [ val1, val2, ...list ],
  list => ({ list }),
  obj => {
    obj.multiArgs = (obj.list[0]+obj.list[1]) === -1
    return obj
  },
  function(obj){
    obj.list.push(0)
    return obj
  },
  ({ list, multiArgs }) => ({ list, initLn: list.length, multiArgs }),
  obj => (
    obj.infIndex = obj.list.indexOf(-Infinity),
    obj),
  // obj => {
  //   const filtered = obj.list.filter(numFilter)
  //   return Object.assign({}, obj, { filtered })
  // },
  // obj => Object.assign({}, obj, { filtLn: obj.filtered.length })
]

console.log(steps.length)

module.exports = { data, steps }