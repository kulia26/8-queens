const Move = require('./move');

const getFirstQueenIndex = (b) => {
    const board = b.slice();
    for (let row = 0; row < 8; row ++) {
        for (let col = 0; col < 8; col ++) {
            if (board[row][col] === 1) {
                return {row, col}
            }
        }
    }
    return false;
}

// return attacked queens count for the queen in a [row, col] index
const getAttackedCount = (b, row, col) => {
    let attacked = 0;
    const board = b.slice();
    const calculateColumnAttacked = () => {
        let counter = row - 1;
        //check top
        let isValid = true;
        while (isValid && counter >= 0) {
            if(board[counter][col] === 1) {
                isValid = false;
                attacked++;
            }
            counter--;
        }

        // bottom
        isValid = true;
        counter = row + 1;
        while (isValid && counter <= 7) {
            if(board[counter][col] === 1) {
                isValid = false;
                attacked++;
            }
            counter++;
        }

    }

    const calculateMainDiagonalAttacked = () => {
        let isValid = true;
        let counter = 1;

        const validateIndex = (i,j) => {
            return i >= 0 && i <= 7 && j >= 0 && i <= 7
        }

        // top left direction
        while (isValid && counter < 8) {
            const topRow = row - counter;
            const leftColumn = col - counter;
            if(validateIndex(topRow, leftColumn)) {
                const topLeft = board[topRow][leftColumn]
                if (topLeft === 1) {
                    isValid = false
                    attacked++;
                }
            }else{
                isValid = false;
            }
            counter++;
        }

        // bottom right direction
        isValid = true;
        counter = 1;
        while (isValid && counter < 8) {
            let bottomRow = row + counter;
            const rightColumn = col + counter;
            if(validateIndex(bottomRow, rightColumn)) {
                const bottomRight = board[bottomRow][rightColumn]
                if (bottomRight === 1) {
                    isValid = false;
                    attacked++;
                }
            }else {
                isValid = false;
            }
            counter++;
        }

    }

    const calculateReflectedDiagonalAttacked = () => {
        let isValid = true;
        let counter = 1;

        const validateIndex = (i,j) => {
            return i >= 0 && i <= 7 && j >= 0 && i <= 7
        }

        // top right direction
        while (isValid && counter < 8) {
            const topRow = row - counter;
            const rightColumn = col + counter;
            if(validateIndex(topRow, rightColumn)) {
                const x = board[topRow][rightColumn]
                if (x === 1) {
                    isValid = false;
                    attacked++;
                }
            }else {
                isValid = false;
            }
            counter++;
        }

        // bottom left direction
        isValid = true;
        counter = 1;
        while (isValid && counter < 8) {
            const topRow = row + counter;
            const rightColumn = col - counter;
            if(validateIndex(topRow, rightColumn)) {
                const x = board[topRow][rightColumn]
                if (x === 1) {
                    isValid = false;
                    attacked++;
                }
            }else {
                isValid = false;
            }
            counter++;
        }
    }

    calculateColumnAttacked();

    calculateMainDiagonalAttacked();

    calculateReflectedDiagonalAttacked();

    return attacked;
}

const removeQueen = (b, row, col) => {
    const board = JSON.parse(JSON.stringify(b));
    board[row][col] = 0;
    return board;
}

// кількість пар ферзів, які б’ють один одного з урахуванням видимості
// (ферзь А може стояти на одній лінії з ферзем В, проте між ними стоїть ферзь С; тому А не б’є В)
const getPairsOfQueens = (initialBoard) => {
    let attacked = 0;
    let board = initialBoard;

    let queenIndex = getFirstQueenIndex(board);

    while (queenIndex) {
        attacked = attacked + getAttackedCount(board, queenIndex.row, queenIndex.col);
        board = removeQueen(board, queenIndex.row, queenIndex.col);
        queenIndex = getFirstQueenIndex(board);
    }

    return attacked;
}

const tests = [
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        expected: 1,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0],
            [0,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        expected: 1,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        expected: 3,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        expected: 2,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        expected: 2,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,1,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        expected: 2,
    },
    {
        board: [
            [1,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0]
        ],
        expected: 7,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,1,1,1,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,1,0]
        ],
        expected: 8,
    },
    {
        board: [
            [1,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        expected: 3,
    },
    {
        board: [
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,1,0],
            [0,0,0,0,0,1,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        expected: 2,
    },
];

const testsRun = () => {
    const results = [];
    console.log('   Run test for get attacked pairs function:')
    tests.forEach(test => {

        const b = JSON.parse(JSON.stringify(test.board));
        results.push(getPairsOfQueens(test.board) === test.expected);
    })
    console.table(results);

}
testsRun();

module.exports = getPairsOfQueens;
