// Установка свойства по сложному пути в объекте
// Необходимо написать функцию, которая бы устанавливало переданное значение объекту по заданному пути.

const obj = {};

function setByPath(entity, feature, value) {
    const keys = feature.split('.')
    for (const [index, key] of keys.entries()) {
        if (index === keys.length - 1) {
            entity[key] = value
        } else {
            entity[key] ??= {}
            entity = entity[key]
        }
    }
}

setByPath(obj, 'foo.bar', 1);
setByPath(obj, 'foo.bla', 2);

console.log(obj); // {foo: {bar: 1, bla: 2}}