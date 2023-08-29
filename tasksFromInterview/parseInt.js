// Реализация функции аналогичной parseInt
// Необходимо написать функцию, которая бы повторяло поведение parseInt.

console.log(myParseInt('10'));      // 10
console.log(myParseInt('-10'));      // -10
console.log(myParseInt('-10px'));      // -10
console.log(myParseInt('1x0px'));      // 1
console.log(myParseInt('-10px3', 2));  // -2
console.log(myParseInt('10px', 2));  // 2
console.log(myParseInt('FFP', 16)); // 255
console.log(myParseInt('--20'));    // NaN

function myParseInt(string, radix) {
    if (!radix) {
        const isNan = /^[a-z]/g.test(string) || /^\W\W/g.test(string)
        if (isNan) {
            return NaN
        } else {
            let result = ''
            for (let i = 0; i < string.length; i++) {
                if (!isNaN(Number(string[i])) || /\W/g.test(string[i])) {
                    result = result + string[i]
                } else {
                    return result
                }
            }
            return result
        }
    }

    if (radix === 16) {
        const numbers = {
            A: 10,
            B: 11,
            C: 12,
            D: 13,
            E: 14,
            F: 15
        }
        let result = 0
        const newString = /([\d, A-F])+/g.exec(string)[0]
        for (let i = 0; i < newString.length; i++) {
            result = result + (numbers[newString[i]] * (Math.pow(radix, (newString.length - 1 - i))))
        }
        return result
    }

    if (radix === 2) {
        let result = 0;
        const newString = /([\d, \W])+/g.exec(string)[0]
        if (newString[0] === '-') {
            for (let i = 1; i < newString.length; i++) {
                result = result + (newString[i] * (Math.pow(radix, newString.length - 1 - i)))
            }
            return Number(-result)
        } else {
            for (let i = 0; i < newString.length; i++) {
                result = result + (newString[i] * (Math.pow(radix, newString.length - 1 - i)))
            }
            return result
        }
    }
}