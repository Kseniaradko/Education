// Promise.allSettled
// Необходимо написать функцию, которая бы повторяло поведение Promise.allSettled.
function allSettled(iter) {
    const promises = [...iter].map((item) => Promise.resolve(item))

    const result = new Array(promises.length)
    let total = 0

    return new Promise(resolve => {
        promises.forEach((promise, i) => {
            promise
                .then((val) => {
                    result[i] = {
                        status: 'fulfilled',
                        value: val
                    }
                    total++
                    if (total >= promises.length) {
                        resolve(result)
                    }
                })
                .catch((val) => {
                    result[i] = {
                        status: 'rejected',
                        value: val
                    }
                    total++
                    if (total >= promises.length) {
                        resolve(result)
                    }
                })
            })

    })
}

allSettled([1, Promise.resolve(2), Promise.reject(3)]).then(([v1, v2, v3]) => {
    console.log(v1); // {status: 'fulfilled', value: 1}
    console.log(v2); // {status: 'fulfilled', value: 2}
    console.log(v3); // {status: 'rejected', reason: 3}
});