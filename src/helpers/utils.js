export const checkWinner = (board) => {
    const winningCombinations = [
        // Rows
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const marks = [board[a].type, board[b].type, board[c].type];

        if (marks.every(mark => mark && mark === marks[0])) {
            return combination;
        }
    }

    return [];
}