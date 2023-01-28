// 1. STRING.CAPITALIZE.
// Необходимо добавить все строкам в JavaScript метод capitalize, который делает первую букву в строке заглавной

String.prototype.capitalize = function () {
    return this[0].toUpperCase() + this.slice(1, this.length)
}

console.log("alexey".capitalize())