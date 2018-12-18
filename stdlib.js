exports.list = Array
exports.pred = exports.list
exports.first = list => list[0]
exports.last = list => list[list.length - 1]
exports.max = Math.max
exports.apply = (fn, args) => fn(...args)
exports.call = (fn, ...args) => fn(...args)
exports.str = (...args) => args.join('')
exports.inc = n => n + 1
exports.map = (acc, list) => list.map(acc)
exports.plus = (...args) => args.reduce((a, b) => a + b)
exports.minus = (...args) => args.reduce((a, b) => a - b)
exports.times = (...args) => args.reduce((a, b) => a * b)
exports.dividedBy = (...args) => args.reduce((a, b) => a / b)
exports.lt = (a, b) => a < b
exports.gt = (a, b) => a > b
exports.lte = (a, b) => a <= b
exports.gte = (a, b) => a >= b
exports.imports = {
  Math: [
    ['defn', '+', exports.plus],
    ['defn', '-', exports.minus],
    ['defn', '*', exports.times],
    ['defn', '/', exports.dividedBy]
  ]
}
exports.cond = (...pairs) => {
  for (let i = 0; i < Math.floor(pairs.length / 2); i++) {
    if (exports.call(...pairs[i * 2])) return pairs[i * 2 + 1]
  }
  if (pairs.length % 2 === 1) return pairs[pairs.length - 1]
}
