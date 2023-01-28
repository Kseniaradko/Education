// 7. Object.create #2.
// Необходимо написать аналог Object.create с использованием Object.setPrototypeOf

function objectCreate(obj) {
    if (!obj) {
        return {}
    }
    return Object.setPrototypeOf({}, obj)
}

const b = objectCreate({a: 1})
console.log(b)
console.log(b.a)