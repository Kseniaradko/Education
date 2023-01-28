// 9. Наследование
// Необходимо сделать класс денег у которого входным параметром является количество денег.
// Также создать класс для Доллара, Евро и рубля, которые наследуются от денег.
// В качестве параметра конструктор доллара они смогут также принимать не только число,
// но и экземпляр другого класса дочернего от денег - в таком случае, вторым параметром можно будет передать курс конвертации.
// Курс конвертации можно менять с помощью метода.
// Задание нужно сделать 2-мя способами: с помощью ES6 class и с помощью функций.

function Money(money) {
    this.money = money
    return this
}

Money.prototype.get = function() {
    if (this.currencyExchange) {
        return (this.money / this.currencyExchange).toFixed(2)
    }
    return this.money
}

function Rub(money) {
    Money.call(this, money)
}

Rub.prototype = {
    __proto__: Money.prototype,
    constructor: Rub,
}

function Dollar(money, currencyExchange) {
    if (Money.prototype.isPrototypeOf(money)) {
        Money.call(this, money.money)
        this.currencyExchange = currencyExchange
    } else {
        Money.call(this, money)
    }
}

Dollar.prototype = {
    __proto__: Money.prototype,
    constructor: Dollar,
    setMod(currencyExchange) {
        this.currencyExchange = currencyExchange
        return this
    }
}

const rub = new Rub(100);
console.log(rub)

console.log(rub.get()); // 100

const dollar = new Dollar(rub, 75);
console.log(dollar)

console.log(dollar.get()) // 1.3

console.log(dollar.setMod(80).get()) // 1.2