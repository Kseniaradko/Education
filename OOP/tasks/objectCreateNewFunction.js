// 8. Object.create #3.
// Необходимо написать аналог Object.create с использованием new function


// function objectCreate(obj) {
//     const result = new Function('obj', 'return Object.create(obj)')
//    return result(obj)
// }

function objectCreate(obj) {
    if (new.target === Object) {
        if (typeof obj === 'object') {
            return Object.create(obj)
        }
        return this
    }
}

console.log(new objectCreate({a: 1}))
