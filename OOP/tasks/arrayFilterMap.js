// 2. array.filterMap.
// Необходимо добавить все массивам в JavaScript метод filterMap, который принимает 2 функции: фильтр и map

Array.prototype.filterMap = function (func1, func2) {
    return this.filter(func1).map(func2)
}

console.log([1, 2, 3, 4].filterMap((el) => el > 2, (el) => el ** 2))