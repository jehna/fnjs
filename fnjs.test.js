const fnjs = require('./fnjs')

describe('fnjs runner', () => {
  it('should export a function', () => {
    expect(fnjs).toBeInstanceOf(Function)
  })

  it('should call input function with args', () => {
    const fn = jest.fn()
    fnjs([fn, 1, 2, 3])

    expect(fn).toBeCalledWith(1, 2, 3)
  })

  it('should call nested funcitons', () => {
    const add = (...args) => args.reduce((a, b) => a + b)
    const program = [add, 1, 2, [add, 3, 4]]
    expect(fnjs(program)).toEqual(10)
  })

  describe('defn', () => {
    it('should let define a global function', () => {
      const program = [['defn', 'foo', () => 'bar'], ['foo']]
      expect(fnjs(program)).toEqual('bar')
    })

    it('should allow single argument', () => {
      const program = [['defn', 'add10', num => num + 10], ['add10', 5]]
      expect(fnjs(program)).toEqual(15)
    })

    it('should allow multiple arguments', () => {
      const program = [
        ['defn', 'doMath', (a, b, c, d) => a - b * c + d],
        ['doMath', 1, 2, 3, 4]
      ]
      expect(fnjs(program)).toEqual(-1)
    })

    it('should compile additional fnjs code', () => {
      const program = [
        ['defn', 'add10', num => [fnjs.stdlib.plus, 10, num]],
        ['add10', 5]
      ]

      expect(fnjs(program)).toEqual(15)
    })
  })
})
