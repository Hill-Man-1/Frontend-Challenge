function countOccurrences(INPUT, QUERY) {
    let counts = [];

    QUERY.forEach(queryItem => {
        let count = INPUT.filter(inputItem => inputItem === queryItem).length;
        counts.push(count);
    });

    return counts;
}

const INPUT = ['abcd', 'dz', 'bbb', 'dz'];
const QUERY = ['aaa','bbb', 'ac', 'dz', 'abcd'];
const OUTPUT = countOccurrences(INPUT, QUERY);
console.log(OUTPUT);