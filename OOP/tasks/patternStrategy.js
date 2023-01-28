// 10. Класс для хранения данных вида "ключ-значение" в локальном хранилище
// Необходимо написать класс KVStorage, который бы реализовывал базовый CRUD API для работы с локальным хранилищем.
// Первым параметром конструктор класса должен получать "движок" или "стратегию", где именно хранить данные.
// Движки следует хранить как статические свойства класса. Методы класса должны возвращать Promise.
// Следует реализовать 2 движка: localStorage и IndexedDB.

class LocalStorage {
    constructor() {
    }

    set(key, value) {
        return localStorage.setItem(key, JSON.stringify(value))
    }

    get(key) {
        return JSON.parse(localStorage.getItem(key))
    }

    delete(key) {
        localStorage.removeItem(key)
    }
}

class IndexedDB {
    request;

    constructor(name) {
        this.request = indexedDB.open(name)
    }

    createStore(name, keyPath) {
        this.request.onupgradeneeded = function() {
            const db = this.request.result;
            const store = db.createObjectStore("books", {keyPath: "isbn"});
            const titleIndex = store.createIndex("by_title", "title", {unique: true});
            const authorIndex = store.createIndex("by_author", "author");

            // Populate with initial data.
            store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
            store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
            store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});
        };

        const result = indexedDB
    }
}

class KVStorage {
    static localStorage = new LocalStorage();
    static IndexedDB;

    engine;

    constructor(engine) {
        this.engine = engine
    }

    set(key, value) {
        return new Promise((resolve) => {
            this.engine.set(key, value)
            resolve()
        })
    }

    get(key) {
        return new Promise(resolve => {
            resolve(this.engine.get(key))
        })
    }
}

const storage = new KVStorage(KVStorage.localStorage);

storage.set('foo', {bla: 1}).then(async () => {
    console.log(await storage.get('foo'));
});