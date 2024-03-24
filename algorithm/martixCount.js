function diagonalDifference(matrix) {
    let primaryDiagonalSum = 0;
    let secondaryDiagonalSum = 0;
    
    for (let i = 0; i < matrix.length; i++) {
        primaryDiagonalSum += matrix[i][i];
        secondaryDiagonalSum += matrix[i][matrix.length - 1 - i];
    }
    return Math.abs(primaryDiagonalSum - secondaryDiagonalSum);
}
const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];
console.log(diagonalDifference(matrix));