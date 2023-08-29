// Реализация Partial классов
// Необходимо написать функцию, которая бы позволяла расширять заданный класс новыми методами.
// В добавляемых методах должен корректно работать super.

class Parent {
    foo() {
        console.log('It works!');
    }
}

class Example extends Parent {}

// моя реализация, по сути просто переопределили прототипы, но так не стоит делать
// function partial(instance, methods) {
//     methods.__proto__ = instance.prototype.__proto__
//     Object.setPrototypeOf(instance.prototype, methods)
// }

// Первым действием устанавливаем прототип нашему приходящему объекту, для того, чтобы работал метод super.
// Вторым действием Object.getOwnPropertyDescriptors(mixin) данная запись берет дескрипторы (узнаем где есть геттеры или сеттеры или это обычная функция.
//  Object.defineProperties(instance.prototype, Object.getOwnPropertyDescriptors(mixin)) определяем прототипу экземпляра класса проперти, которые определили выше.
function partial(instance, mixin) {
    Object.setPrototypeOf(mixin, Object.getPrototypeOf(instance.prototype))
    Object.defineProperties(instance.prototype, Object.getOwnPropertyDescriptors(mixin))
}

partial(Example, {
    foo() {
        super.foo();
        console.log('Yeaaah');
    },

    get bar() {
        return Math.random();
    }
});

const example = new Example();

example.foo(); // It works! Yeaaah

console.log(example.bar); // Случайное число
console.log(example.bar); // Случайное число
console.log(example.bar); // Случайное число