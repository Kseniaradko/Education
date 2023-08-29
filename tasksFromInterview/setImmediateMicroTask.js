// Необходимо реализовать функцию, которая бы предоставляла API схожее с setTimeout, но создавала бы микротаску.
let setImmediateTimer = new Map()

function setImmediate(cb) {
    const timer = setImmediateTimer.size

    setImmediateTimer.set(timer, true)

    queueMicrotask(() => {
        if (setImmediateTimer.get(timer) === false) {
            return
        }
        cb()
    })

    return timer
}

function clearImmediate(timer) {
    if (timer > setImmediateTimer.size) {
        return
    }

    setImmediateTimer.set(timer, false)
}

setTimeout(() => {
    console.log(3);
}, 0);

setImmediate(() => {
    console.log(1);
});

const timer = setImmediate(() => {
    console.log(2);
});

clearImmediate(timer);