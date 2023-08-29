// Необходимо написать функцию, которая бы принимала другую функцию и возвращала её каррированную версию.

function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.call(this, ...args)
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2))
            }
        }
    }
}

const sum = curry((a, b, c, z) => a + b + c + z);

console.log(sum(1)(2)(3)(4)); // 10;
console.log(sum(1)(2)(3, 4)); // 10;
console.log(sum(1)(2, 3, 4)); // 10;