//4. User.
// Необходимо создать функцию-конструктор, которая создает пользователя с заданным именем (имя и фамилия) и возрастом.
// А также, необходимо определить функции, sayName (возвращает полное имя) и has18 (true, если есть 18)

function User(name, surname, age) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    return this
}

User.prototype.sayName = function() {
    return this.name + ' ' + this.surname
}

User.prototype.has18 = function() {
    return this.age > 18;

}
const user = new User('Andrey', 'Kobets', 32);
console.log(user)

console.log(user.has18()) // true

user.sayName() // 'Andrey Kobets'