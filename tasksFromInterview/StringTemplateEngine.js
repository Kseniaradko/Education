//Шаблонизатор строки с поддержкой выражений
// Необходимо создать функцию, которая бы принимала шаблон и объект с данными, а возвращала бы конечную строку.

function format(template, params) {
    return template.replace(/\${(.*?)}/g, (_, expr) => {
        return Function(...Object.keys(params), `return ${expr}`)(...Object.values(params))
    })
}

format('Hello ${name}!', {name: 'Bob', age: 12}); // 'Hello Bob! My age is 24.'
const obj = {
    name: 'Alex'
}
console.log('hello' + ' ' + `${obj.name}`)

// May age is ${age * 2}.