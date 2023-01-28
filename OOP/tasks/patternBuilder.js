// 11. Использование паттерна "builder" для эффективной записи в локальное хранилище.
// С помощью специальных статических методов наполняем внутренний буффер,
// а затем сразу все инициализируем (вызов create)
class LocalStorage {
    constructor() {
    }
}

class KVStorage {
    static localStorage = new LocalStorage()
    static engine

    constructor() {}

    static storage(engine) {
        this.engine = engine
    }

    static set(key, value) {

    }

    static create() {}
}

const storage = KVStorage
    .storage(KVStorage.localStorage)
    .set('foo', {bla: 1})
    .set('bar', {bar: 2})
    .create();