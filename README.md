# FnJS

> A functional JavaScript library prototype

This is a simple prototype of a syntax that could be used to simulate a
Clojure-type of syntax with JavaScript.

## Usage examples

The basic usage is to include the library `fnjs.js` in your project and use the
library to "compile" your fnjs syntax:

```javascript
// Run directly
require('./fnjs.js')(
  [console.log, 'Hello world!'] // Prints "Hello world!"
)

// Or have it inside a variable
const fnjs = require('./fnjs.js')
fnjs([console.log, 'hello world'])
```

This includes the script "compiler" library and runs the `console.log` against
the input string.

### Math library

You can do basic calculations by including the Math library, such as:

```javascript
fnjs([
  [fnjs.stdlib.imports.Math], // Imports math functions

  [console.log, ['*', 2, 2, 2]], // Prints "8"

  [console.log, ['+', 10, 10, ['-', 10, 5]]] // Prints "25"
])
```

As with Clojure, the numbers are calculated from left-to-right.

### Defining functions

You can define your own functions as such:

```javascript
fnjs([
  ['defn', 'square', a => a * a],

  [console.log, ['square', 5]] // Prints "25"
])
```

You can also use the `defn` to run more fnjs code

```javascript
fnjs([
  [fnjs.stdlib.imports.Math], // Imports math functions

  ['defn', 'square', a => ['*', a, a]],

  [console.log, ['square', 5]] // Prints "25"
])
```

### Using builtin stdlib

The builtin stdlib comes with many handy functions. You can find the different
functions in the `stdlib`:

```javascript
const fnjs = require('fnjs')
fnjs([fnjs.stdlib.inc, 15]) // Outputs 16
```

However you might want to use functions from the `stdlib` by spreading them to
top-level functions:

```javascript
const fnjs = require('fnjs')
const { inc } = fnjs.stdlib
fnjs([inc, 15]) // Outputs 16
```

Note that the `stdlib` only includes a number of functions that you can use, but
any JavaScript function can be used:

```javascript
fnjs([Math.ceil, 0.5]) // Outputs 1
```

Here's a few `stdlib` functions to get you started, note the minor differencies
between Clojure:

#### list

While you have a list shorthand available at Clojure (use `[]` instead of `()`),
in fnjs you'll need to use the list constructor to build up lists:

```javascript
fnjs([list, 1, 2, 3, 4, 5]) // outputs [1, 2, 3, 4, 5]
```

#### map

Using `map` you'll need to pass a `list` as the third argument to make it work
properly, otherwise the first value is epected to be a function or global
function name.

```javascript
fnjs([map, inc, [list, 1, 2, 3]]) // Outputs [2, 3, 4]
```

#### cond

You can use `cond` pretty much the same as you'd use it with Clojure, but the
predicates will need to be prefixed with `pred` function:

```javascript
fnjs(
  [cond,
    [pred, lt, 2, 2], 'foo',
    [pred, gt, 5, 2], 'bar'])
```

## Features

This project:

- Achieves Clojure-like syntax for your JavaScript
- Does not actually isolate the scopes (yet)
- Is just a quick draft of an idea
  - Please do not use in production (yet)

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. All improvements and ideas are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.
