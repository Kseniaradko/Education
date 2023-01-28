// 6. Object.create.
// Необходимо написать аналог Object.create с использованием __proto__

function objectCreate(obj) {
    if (!obj) {
        return {}
    }
    return {__proto__: obj}
}

const b = objectCreate({a: 1})
console.log(b)
console.log(b.a)