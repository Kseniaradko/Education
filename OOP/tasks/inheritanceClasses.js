// 9. Наследование
// Необходимо сделать класс денег у которого входным параметром является количество денег.
// Также создать класс для Доллара, Евро и рубля, которые наследуются от денег.
// В качестве параметра конструктор доллара они смогут также принимать не только число,
// но и экземпляр другого класса дочернего от денег - в таком случае, вторым параметром можно будет передать курс конвертации.
// Курс конвертации можно менять с помощью метода.
// Задание нужно сделать 2-мя способами: с помощью ES6 class и с помощью функций.

class Money {
    money;

    constructor(money) {
        this.money = money
    }

    get() {
        if (this.convert) {
            return (this.money / this.convert).toFixed(2)
        }
        return this.money
    }

    setMod(newConvert) {
        this.convert = newConvert
        return this
    }
}

class Dollar extends Money {
    constructor(money, convert) {
        if (money instanceof Money) {
            super(money.money)
            this.convert = convert
        } else {
            super(money)
        }
    }
}

class Rub extends Money {
    constructor(money) {
        super(money)
    }
}

const rub = new Rub(100);
console.log(rub)

console.log(rub.get()); // 100

const dollar = new Dollar(rub, 75);
console.log(dollar)

console.log(dollar.get()) // 1.33

//Надо сделать так, чтобы метод setMod можно было "чейнить"
console.log(dollar.setMod(80).get()) // 1.25
