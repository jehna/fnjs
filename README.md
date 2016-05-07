# FnJS
> A functional JavaScript library prototype

This is a simple prototype of a syntax that could be used to simulate a
Clojure-type of syntax with JavaScript.

## Usage examples

The basic usage is to include the library `fnjs.js` in your project and use the
library to "compile" your fnjs syntax:

```javascript
require("./fnjs.js")(
    
    ["log", "Hello world!"]  // Prints "Hello world!"

)
```

This includes the script "compiler" library and runs the `log` function to the
input string.

### Basic calculations

You can do basic calculations, such as:

```javascript
require("./fnjs.js")(
    
    ["log", 
        ["*", 2, 2, 2]],    // Prints "8"
    
    ["log",
        ["+", 10, 10,
            ["-", 10, 5]]]  // Prints "25"

)
```

As with Clojure, the numbers are calculated from left-to-right.

### Defining functions

You can define your own functions as such:

```javascript
require("./fnjs.js")(
    
    ["defn", 
        "square", (a) => a * a],
    
    ["log",
        ["square", 5]]    // Prints "25"

)
```

## Features

This project:
* Achieves Clojure-like syntax for your JavaScript
* Does not actually isolate the scopes (yet)
* Is just a quick draft of an idea
  * Please do not use in production (yet)


## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. All improvements and ideas are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.
