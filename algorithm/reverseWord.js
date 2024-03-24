// Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

function reverseWord(word) {
    const words = word.split(' ');

    function reverseAlphabets(word) {
        let alphabetChars = '';
        
        for (let i = 0; i < word.length; i++) {
            if (/[a-zA-Z]/.test(word[i])) {
                alphabetChars += word[i];
            }
        }

        const reversedAlphabets = alphabetChars.split('').reverse().join('');

        let reversedWord = '';
        let alphabetIndex = 0;
        for (let i = 0; i < word.length; i++) {
            if (/[a-zA-Z]/.test(word[i])) {
                reversedWord += reversedAlphabets[alphabetIndex];
                alphabetIndex++;
            } else {
                reversedWord += word[i];
            }
        }
        return reversedWord;
    }

    const reversedWords = words.map(word => reverseAlphabets(word));

    const reversedWord = reversedWords.join(' ');
    return reversedWord;
}

const word = "NEGIE1";
const reversed = reverseWord(word);
console.log(reversed); 
