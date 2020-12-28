const isMoveCorrect = (board, row) => {
    // queen on [row;queenIndex]
    const queenIndex = board[row].findIndex(x => x===1);

    const validateColumn = () => {
        let isValid = true;
        let counter = row;
        while (isValid && counter >= 0) {
            if(board[counter][queenIndex] === 1 && counter !== row) {
                isValid = false
            }
            counter--;
        }
        return isValid;
    }

    const validateMainDiagonal = () => {
        let isValid = true;
        let counter = 1;

        const validateIndex = (i,j) => {
            return i >= 0 && i <= 7 && j >= 0 && i <= 7
        }

        while (isValid && counter < 8) {
            let topRow = row - counter;
            const leftColumn = queenIndex - counter;
            if(validateIndex(topRow, leftColumn)) {
                const topLeft = board[topRow][leftColumn]
                if (topLeft === 1) {
                    isValid = false
                }
            }

            // let bottomRow = row + counter;
            // const rightColumn = queenIndex + counter;
            // if(validateIndex(bottomRow, rightColumn)) {
            //     const bottomRight = board[bottomRow][rightColumn]
            //     if (bottomRight === 1) {
            //         isValid = false
            //     }
            // }
            counter++;
        }
        return isValid;
    }

    const validateReflectedDiagonal = () => {
        let isValid = true;
        let counter = 1;

        const validateIndex = (i,j) => {
            return i >= 0 && i <= 7 && j >= 0 && i <= 7
        }

        while (isValid && counter < 8) {
            let topRow = row - counter;
            const rightColumn = queenIndex + counter;
            if(validateIndex(topRow, rightColumn)) {
                const topRight = board[topRow][rightColumn]
                if (topRight === 1) {
                    isValid = false
                }
            }
            counter++;
        }
        return isValid;
    }

    return validateColumn() // && validateMainDiagonal() // && validateReflectedDiagonal()
}

const tests = [
    {
        board: [
            [0,1,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        row: 1,
        expected: false,
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
        row: 2,
        expected: false,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        row: 2,
        expected: true,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        row: 6,
        expected: false,
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
        row: 5,
        expected: false,
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
        row: 3,
        expected: true,
    },
    {
        board: [
            [0,1,0,1,0,0,0,0],
            [1,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,1,1,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0],
            [0,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        row: 2,
        expected: true,
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
        row: 3,
        expected: true,
    },
    {
        board: [
            [1,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        row: 2,
        expected: false,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1],
            [0,0,0,0,0,1,1,1],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        row: 1,
        expected: true,
    },
];

const testsRun = () => {
    const results = [];
    console.log('   Run test for isMoveCorrect constructor:')
    tests.forEach((item) => {
        results.push(isMoveCorrect(item.board, item.row) === item.expected);
    })
    console.table(results);
}

testsRun();

module.exports = isMoveCorrect;
