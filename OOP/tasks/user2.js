// 5. User2
// Необходимо создать функцию-конструктор, которая создает пользователя с заданным именем (имя и фамилия) и возрастом.
// А также, необходимо определить функции, sayName (возвращает полное имя) и has18 (true, если есть 18)

function User({fname, lname, age}) {
    this.name = fname;
    this.surname = lname;
    this.age = age;
    return this
}

User.prototype.sayName = function () {
    return this.name + ' ' + this.surname
}

User.prototype.has18 = function () {
    return this.age > 18;
}

const user = new User({
    fname: 'Andrey',
    lname: 'Kobets',
    age: 32
});
console.log(user)

user.has18() // true

console.log(user.sayName()) // 'Andrey Kobets'