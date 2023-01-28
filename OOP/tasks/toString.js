// 3. Кастомный toString.
// Необходимо сделать конкретному массиву метод toString, который возвращает первый элемент .. последний.
function addToString(array) {
    array.toString = function () {
        if (this.length === 0) return
        if (this.length === 1) return this[0]
        return this[0] + '...' + this[this.length - 1]
    }
    return array
}

// 1..4
console.log(addToString([1, 2, 3, 4]).toString())

// 1
addToString([1]).toString()

//
addToString([]).toString()