function FnJS() {
    var fns = {
        "defn": function(args) {
            fns[args[0]] = args[1];
        },
        "log": function(args) {
            console.log.apply(this, args);
        },
        "+": function(args) { return args.reduce(function(a,b) { return a + b; }) },
        "-": function(args) { return args.reduce(function(a,b) { return a - b; }) },
        "*": function(args) { return args.reduce(function(a,b) { return a * b; }) },
        "/": function(args) { return args.reduce(function(a,b) { return a / b; }) },
        "if": function(args) { return args[0] ? args[1] : args[2]; }
    }

    function val(val) {
        if (Array.isArray(val)) {
            return run(val);
        } else {
            return val;
        }
    }

    function run(args) {
        return fns[args.shift()].call(this, args.map(val));
    }

    return function() {
        return Array.prototype.slice.call(arguments).map(run);
    }
}

module.exports = FnJS();
