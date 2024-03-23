function longestWord(sentence) {
    const words = sentence.split(/\s+/);

    let longest = "";
    let maxLength = 0;

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordLength = word.replace(/[^A-Za-z0-9]/g, "").length;

        if (wordLength > maxLength) {
            longest = word;
            maxLength = wordLength;
        }
    }

    return `${longest} = ${maxLength}`;
}

const sentence = "hallo my name is hilmansf";
const result = longestWord(sentence);
console.log(result);
