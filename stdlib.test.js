const fnjs = require('./fnjs')
const {
  list,
  last,
  first,
  max,
  apply,
  str,
  inc,
  map,
  plus,
  minus,
  imports,
  cond,
  pred,
  lt,
  gt
} = require('./stdlib')

describe('stdlib', () => {
  describe('list', () => {
    it('should return an array', () => {
      expect(fnjs([list, 'hello', 'world'])).toEqual(['hello', 'world'])
    })
  })

  describe('first', () => {
    it('should return the first element of an array', () => {
      expect(fnjs([first, [list, 1, 2, 3, 4]])).toEqual(1)
    })
  })

  describe('last', () => {
    it('should return the last element of an array', () => {
      expect(fnjs([last, [list, 1, 2, 3, 4]])).toEqual(4)
    })
  })

  describe('max', () => {
    it('should return the last element of an array', () => {
      expect(fnjs([max, 1, 2, 3, 4])).toEqual(4)
    })
  })

  describe('apply', () => {
    it('apply the arguments to the function', () => {
      expect(fnjs([apply, max, [list, 1, 2, 3, 4]])).toEqual(4)
    })
    it('works from the predefined function', () => {
      expect(fnjs(['apply', max, [list, 1, 2, 3, 4]])).toEqual(4)
    })
  })

  describe('str', () => {
    it('convert the item to string', () => {
      expect(fnjs([str, 'hello', 'world'])).toEqual('helloworld')
    })
  })

  describe('inc', () => {
    it('increments the number by one', () => {
      expect(fnjs([inc, 1])).toEqual(2)
    })
  })

  describe('map', () => {
    it('map through the list', () => {
      expect(fnjs([map, inc, [list, 1, 2, 3]])).toEqual([2, 3, 4])
    })
  })

  describe('+/plus', () => {
    it('works as its own function', () => {
      expect(fnjs([plus, 1, 2, 3])).toEqual(6)
    })

    it('works as injected global function from Math library', () => {
      const program = [[imports.Math], ['+', 1, 2, 3, 4]]
      expect(fnjs(program)).toEqual(10)
    })
  })

  describe('-/minus', () => {
    it('works as its own function', () => {
      expect(fnjs([minus, 10, 3, 2])).toEqual(5)
    })

    it('works as injected global function from Math library', () => {
      const program = [[imports.Math], ['-', 6, 3]]
      expect(fnjs(program)).toEqual(3)
    })
  })

  describe('cond', () => {
    it('should return the condition that matches the predicate', () => {
      const program = [cond, [pred, lt, 2, 2], 'foo', [pred, gt, 5, 2], 'bar']
      expect(fnjs(program)).toEqual('bar')
    })

    it('should return last condition element if there are uneven number of results and none of the results match', () => {
      const program = [
        cond,
        [pred, lt, 2, 2],
        'foo',
        [pred, gt, 2, 5],
        'bar',
        'failed!'
      ]
      expect(fnjs(program)).toEqual('failed!')
    })
  })
})
