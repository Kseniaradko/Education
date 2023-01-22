# EcmaScript

+ JavaScript — это язык программирования, который используется для различных платформ (браузеров, Node.js, Deno, и т.д.).
+ JS - это язык с динамической типизацией. Языки с динамической типизацией это очень гибко и мощно, статическая типизация меньше могущества, но более надежно и более эффективный код, 
так как на моменте компиляции происходит сравнение необходимых типов с приходящими данными и именно тут выдается ошибка. 
А в динамическом типизировании ошибка происходит уже в момент выполнения именно этого кода.

+ ECMAScript — это языковой стандарт, которому соответствует JavaScript.

### EcmaScript6
Новые возможности, которые принес EcmaScript6:
+ В ES6 перешли от var к let/const;
+ Template Literals(С помощью бэктика () и интерполяции строк ${}`):
    ```javascript
    const first = 'Adrian';
    const last = 'Mejia';
    console.log(`Your name is ${first} ${last}.`);

+ Destructuring Assignment (Деструктуризация):
    ```javascript
    const data = {
        phone: 89047364555,
        name: Ksenia
    }
    const { phone, name } = data
    console.log(phone, name) // 89047364555 Ksenia
+ Классы и объекты.
    + В ES5 объектно-ориентированное программирование достигалось с помощью функций-конструкторов.
    + В ES6 есть новый синтаксический сахар. Можно сделать то же самое с меньшим кодом и с использованием ключевых слов class и construсtor.
+ Наследование: с помощью слов extends и super.
+ Стрелочные функции: () => {}

### Последний EcmaScript сейчас - это EcmaScript2022:
+ Глобальный await в модулях 
+ Проверка приватных слотов через оператор in:
    + ClassWithPrivateSlot.hasPrivateSlot(obj1)
+ Метод .at() - позволяет брать из индексируемых элементов последние значения, принимает отрицательное число:
    ```javascript
    const array = [1, 2, 3, 4]
    console.log(array.at(-1)) // 4
+ Метод Object.hasOwn(obj, propKey):
    + Параметр Object.hasOwn(obj, propKey) — это безопасный способ проверить, есть ли у объекта obj свое собственное (не наследуемое) свойство с ключом propKey.
  ```javascript
    const proto = {  
         protoProp: 'protoProp',
    };
    const obj = {  
      __proto__: proto,  
      objProp: 'objProp',
    }
    Object.hasOwn(obj, 'protoProp') // false 
    Object.hasOwn(proto, 'protoProp') // true