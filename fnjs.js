module.exports = program => {
  const environment = createEnvironment()

  function applyFn(...input) {
    const [func, ...args] = input

    if (Array.isArray(func)) {
      return input.map(args => applyFn(...args)).pop()
    }

    if (typeof func === 'function') {
      return func.apply(null, args.map(val))
    }

    if (environment.get(func)) {
      return applyFn(environment.get(func), ...args)
    }

    throw new Error(`No function ${func} defined!`)
  }

  function createEnvironment() {
    const env = new Map()
    env.set('defn', (key, fn) => {
      env.set.bind(env)(key, (...args) => val(fn(...args)))
    })
    env.set('apply', (fn, args) => applyFn(fn, ...args))
    return env
  }

  function val(expression) {
    if (Array.isArray(expression)) {
      return applyFn(...expression)
    }
    return expression
  }

  return applyFn(...program)
}

module.exports.stdlib = require('./stdlib')
