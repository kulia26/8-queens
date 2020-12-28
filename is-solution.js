const isSolution = (board) => {

    const calculateArraySum = (arr) => arr.reduce((a, v) => a + v, 0);

    const isRowsValid = () => {
        for (let i = 0; i < 8; i++){
            if (calculateArraySum(board[i]) > 1) return false;
        }

        return true;
    }

    const isColsValid = () => {
        for (let i = 0; i < 8; i++){
            let column  = [
                board[0][i],
                board[1][i],
                board[2][i],
                board[3][i],
                board[4][i],
                board[5][i],
                board[6][i],
                board[7][i],
            ];
            if (calculateArraySum(column) > 1) return false;
        }

        return true;
    }

    const isDiagonalsValid = () => {
        for (let i = 0; i < 8; i++){
            let bottomDiagonal  = [];
            let topDiagonal = [];
            let bottomDiagonalReflected = [];
            let topDiagonalReflected = [];
            for (let j = 0; j < 8; j++) {
                bottomDiagonal.push((board[j+i] || [0,0,0,0,0,0,0,0])[j])
                topDiagonal.push((board[i-j] || [0,0,0,0,0,0,0,0])[j])
                bottomDiagonalReflected.push((board[j+i] || [0,0,0,0,0,0,0,0])[7-j])
                topDiagonalReflected.push((board[i-j] || [0,0,0,0,0,0,0,0])[7-j])
            }

            if (calculateArraySum(bottomDiagonal) > 1 || calculateArraySum(topDiagonal) > 1) return false;
            if (calculateArraySum(bottomDiagonalReflected) > 1 || calculateArraySum(topDiagonalReflected) > 1) return false;
        }

        return true;
    }

    return isRowsValid() && isColsValid() && isDiagonalsValid();

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
        isSolutionExpected: false,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        isSolutionExpected: false,
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
        isSolutionExpected: false,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        isSolutionExpected: false,
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
        isSolutionExpected: false,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,1,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        isSolutionExpected: false,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,0,0],
            [0,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        isSolutionExpected: false,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,1,0]
        ],
        isSolutionExpected: false,
    },
    {
        board: [
            [1,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        isSolutionExpected: false,
    },
    {
        board: [
            [0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,1,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        isSolutionExpected: false,
    },
    {
        board: [
            [1,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        isSolutionExpected: false,
    },
    {
        board: [
            [0,1,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        isSolutionExpected: false,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0]
        ],
        isSolutionExpected: false,
    },
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0]
        ],
        isSolutionExpected: false,
    },
];

const testsRun = () => {
    const results = [];
    console.log('   Run test for isSolution method:')
    tests.forEach((test, index) => {
        results.push([index, isSolution(test.board) === test.isSolutionExpected])
    })
    console.table(results);
}

testsRun();

module.exports = isSolution;
