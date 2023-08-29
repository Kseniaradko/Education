# Event Loop
1. Архитектура браузера - из чего он состоит:
   1. User interface - часть браузера, с которой взаимодействует пользователь 
(как правило это какая-то верхняя или боковая панель, пространство, где вводим url, нажимаем на кнопки вперед и назад и так далее)
   2. browser engine - движок браузера, соединительная часть между пользовательским интерфейсом и механизмом рендеринга.
   3. rendering engine - движок рендера, благдаря нему мы и получаем страницы, с которыми можно взаимодействовать.
Два самых популярных движка - это webkit в chrome, и gecko в firefox. Основная задача движка - это обработка кода, который был написан, строится дом дерево, определяется расположение элемента.
   4. Networking - для работы с сетью, история сайтов, которые посещали, доменные имена, взаимодействие с dns серверами, обмен пакетами.
   5. JS interpreter - движок javascript. Та часть, которая обрабатывает js-код. Самый популярный v8.
   6. UI backend - внутренняя часть, которая предоставляет логику для интерфейса самого браузера.
   7. Data Persistence - хранилище данных, local storage, обрабатывает куки.

В движке JavaScript есть Call stack (стек вызовов). Основные задачи:
   1. Работа с кучей (heap) и стек вызовов.
   2. Работа с памятью (выделение памяти и сбор мусора).
   3. **Компиляция JS в машинных код.**
   4. Оптимизация (кеши, скрытые классы и прочее).

Event loop не является частью движков, таких как v8. Цикл событий предоставляется средой, например браузером или node.js.
У каждого браузера есть свое WEB api, которое предоставляет settimeout, обработку слушателя событий нажатия на кнопку, отправку запросов и так далее.
Как задачи попадают в очередь задач в event loop?
   ```javascript
   function log(value) {
        console.log(value)
    }

    log('start')

    setTimeout(() => {
        log('timeout')
    }, 3000)

    log('end')
```
   Сначала setTimeout попадает в call stack, после этого он регистрируется в Web api, и на этом этапе запускается таймер.
После того, как таймер иссяк, задача перемещается в очередь задач, и после того как call stack очистился и пришло время взять задачу из очереди, он выполняется (setTimeout)
То есть порядок такой, сначала выполняются все синхронные задачи, потом после истечения теймера, задача попадает в очередь задач и после того, как все синхронные задачи были выполнены, мы берем эту задачу и выполняем ее.

Task queue - очередь задач. Задачи из очереди могут попасть в стек, только после вызова всех функций из стека:
   1. Macrotask queue - очередь событий:
      1. Таймеры (setTimeout, setInterval),
      2. События (клик, загрузка изображения и т.д.),
      3. Браузерные нюансы (рендер, Input or output)
   2. Microtask queue - очередь задач: 
      1. Промисы, 
      2. queueMicrotask - создание микротаски явно, 
      3. mutationObserver - Интерфейс MutationObserver предоставляет возможность отслеживать изменения, вносимые в дерево DOM.

Сначала выполняются все синхронные задачи, потом выполняются все микротаски, выполняется одна макротаска, если она порождает микротаски, то потом опять все микротаски и дальше макротаска.

```javascript
   function log(value) {
        console.log(value)
    }

    log('1')

    setTimeout(() => {
        log('setTimeout 1')
       Promise.resolve().then(() => {
           log('promise setTimeout')
       })
    }, 0)
    
    setTimeout(() => {
        log('setTimeout 2')
    }, 0)

    queueMicrotask(() => {
        log('queueMicrotask 1')
    })

    Promise.resolve().then(() => {
        log('promise 1')
    })

   Promise.resolve().then(() => {
      log('promise 2')
   })

    log('4')
```

Порядок выполнения:
1. 1
2. 4
3. queueMicrotask 1
4. promise 1
5. promise 2
6. setTimeout 1
7. promise setTimeout
8. setTimeout 2

## Render (отрисовка)
1. DOM
2. CSS Object Model
3. Render tree
4. Калькуляция стилей - применение селекторов к элементам (определяет какие стили и к чему необходимо применить)
5. Layout - достаточно ресурсоемкий этап, на нем браузер уже знает какие стили к какому элементу должны быть применены.
На этом этапе происходит составление макета, чертежа страницы, на какую часть с какими отступами надо расположить элемент.
6. Paint - рисует из чертежа пиксели.
7. Compositing - браузер делит то, что мы получили на слои и создает дерево из слоев, делает браузер, чтобы правильно все видела видеокарта и так далее.

Рендер - это дорогостоящая операция, поэтому надо стараться как можно меньше с этим что-то делать.
Что вызывает ререндер:
1. Изменение размера окна (resize);
2. Изменение шрифта;
3. Изменение контента;
4. Добавление\ удаление классов\стилей;
5. Манипуляции с DOM;
6. Изменение ориентации (альбом\книга);
7. Изменение размеров\позиции;
8. Вычисление размеров\позиции;

Что такое критический путь?

Критический путь рендеринга – это набор минимально необходимых для начала отрисовки страницы действий, ресурсов и вычислений.

Критический путь можно измерять в количестве критических ресурсов, минимальном времени загрузки (измеряется в RTT) и объеме критических ресурсов (в байтах).


Настоящая веб-страница состоит из HTML-документа и некоторого количества внешних ресурсов: CSS-файлы, JS-файлы, шрифты, картинки и т. д. Современные браузеры стараются максимально оптимизировать процесс загрузки страницы, чтобы начать рендеринг как можно быстрее. Однако, браузеры ограничены спецификациями CSS и JS, поэтому должны строить страницу в строгой последовательности. Конечный этап критического пути – построение Render Tree, по которому браузер может начинать рендеринг.

Посмотрим основные шаги, которые включает в себя критический путь:
Получить HTML-документ.
Провести парсинг HTML на предмет включенных ресурсов.
Построить DOM tree (document object model).
Отправить запросы критических элементов.
Получить весь CSS-код (также запустить запросы на JS-файлы).
Построить CSSOM tree.
Выполнить весь полученный JS-код.
Перестроить DOM tree (при необходимости).
Построить Render tree и начать отрисовку страницы.

Из этой последовательности можно сделать несколько важных выводов.

Во-первых в критическом пути участвуют ресурсы c CSS и JS-кодом. Остальные внешние ресурсы там не учитываются.
Во-вторых, JS-код не может выполняться, пока не получены все ресурсы CSS и не построено CSSOM дерево.
В-третьих, страница не может быть отрисована до выполнения JS-кода, так как он может изменять DOM-дерево.
Но не всё так просто: дело, как обычно, в деталях. Наша задача: максимально сократить критический путь рендеринга для нашей страницы.