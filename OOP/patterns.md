## Паттерны объектно-ориентированного программирования
Паттерн - это проверенное временем решение, которое решает какую-то определенную проблему, существующую в определенном языке.
Паттернов в функциональном программировании гораздо меньше, чем в ООП.
1. Паттерн **Композиция**;
2. Паттерн **Стратегия**;

## Паттерн "КОМПОЗИЦИЯ"
Внутри класса добавляем свойства и внутри конструктора (например) создаем свойства через создание экземпляров классов.
По сути создаем композицию из нескольких классов.
```javascript
class Messages {
    constructor(id) {}
}

class Friends {
    constructor(id) {}
}

class User {
    id;
    messages;
    friends;
    
    constructor(id) {
        this.id = id;
        this.messages = new Messages(this.id)
        this.friends = new Friends(this.id)
    }
}
```
Плюсы:
+ Вертикальное наследование сокращается (убирается вертикальное наследование из 20-30 классов);
+ Не такая сильная связанность между подклассами (можно не бояться добавить в класс Friends какие-то новые методы и что это как-то сломает класс User, так как friends это просто свойство в этом классе).
+ Больше устойчивость.

## Паттерн "СТРАТЕГИЯ"
Пример: класс, который будет делать сохранение в локальное хранилище.
```javascript
class KVStorage {
    constructor(type) {
        this.type = type;
    }
    get() {
        if (this.type === 'localStorage') {
            localStorage.getItem()
        }
    }
    set() {}
}
```

Такой способ приведет к тому, что понадобятся приватные методы, надо будет их заводить и класс разрастется очень сильно. Соответственно, усложнится поддержка и работа с ним.

Здесь вступает принцип СТРАТЕГИИ, который говорит, что в конструкторы типов передавать надо не какое-то непонятное свойство, а передавать стратегию, либо как-то указывать на эту стратегию.
```javascript
class LocalStorage {}

class IndexDB {}

class KVStorage {
    constructor(engine) {
        this.engine = engine; // стратегия
    }
    get() {
        this.engine.get()
    }
    set() {}
}

new KVStorage(new LocalStorage())
```

Соответственно код этого класса становится намного проще и читабельней. В коде этого класса уже сосредоточена логика, которая сопряжена уже с конкретным интерфейсом, с которым работаем пользователь.
Паттерн СТРАТЕГИЯ радикально справляется с IF, что делает код надежнее.

## Паттерн "СИНГЛТОН"
В вашей программе экземпляр конкретного класса может быть только один.
Пример: класс MyRequest, который делает запросы. Надо, чтобы когда мы создаем множество экземпляров, по факту везде был только один объект.
```javascript
let cache;

class MyRequest {
    constructor() {
        if (cache !== null) {
            return cache
        }
        cache = this
    }
    get() {
        
    }
}

new MyRequest()
new MyRequest()
new MyRequest()
new MyRequest()

```
Таким образом сколько бы мы не создавали экземпляров всегда будет только один объект.
Так как при первом объявлении cache будет пустой и он запишет в cache this.
Соответственно, создавая второй раз экземпляр класса, мы заходим в проверку и видим, что переменная cache уже не пустая и поэтому возвращаем ее.
Это нужно для того, чтобы не делать много однотипных запросов, а хэшировать данные и быстрее их отдавать соответственно.
```javascript
new MyRequest().get('foo')
new MyRequest().get('foo')
new MyRequest().get('foo')
new MyRequest().get('foo')
```
Здесь совершится только один запрос, а далее данные будут браться из переменной.

Еще один вариант реализации без создания переменной в глобальной области видимости, а сохранить ее как свойство в классе:
```javascript
class MyRequest {
    static cache;
    
    constructor() {
        const {cashe} = this.constructor
        if (cache !== null) {
            return cache
        }
        cache = this
    }
    get() {
        
    }
}

new MyRequest()
new MyRequest()
new MyRequest()
new MyRequest()
```