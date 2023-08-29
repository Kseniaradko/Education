// Нахождение максимальной глубины в дереве
// Необходимо написать функцию, которая бы возвращала максимальную глубину заданного дерева.

const obj = {
    value: 'foo',
    children: [
        {
            value: 'bar'
        },

        {
            value: 'bla',
            children: [{value: 'baz'}]
        }
    ]
};

console.log(maxDepth(obj)); // 2
console.log(maxDepth({}))

function maxDepth(root) {
    let max = 0;

    function calcDepth(obj, startDepth = 0) {
        obj.children?.forEach((node) => {
            const depth = calcDepth(node, startDepth + 1)

            if (depth > max) {
                max = depth
            }
        })
        return startDepth
    }

    calcDepth(root)

    return max
}