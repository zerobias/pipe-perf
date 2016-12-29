//various redux compose variants

function reduxFilter(...funcs) {
  funcs = funcs.filter(func => typeof func === 'function')

  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function reduxNoFilter(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}

function es5ReduxNF() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key]
  }

  if (funcs.length === 0) {
    return function(arg) {
      return arg
    }
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return function() {
    return rest.reduceRight(function(composed, f) {
      return f(composed)
    }, last(...arguments))
  }
}

module.exports = { es5ReduxNF, reduxNoFilter, reduxFilter }