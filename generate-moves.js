const isMoveCorrect = require('./is-move-correct');
const Move = require('./move');

const generateMoves = (initialMove, rowForMove, onlyCorrect = true) => {
    const possibleMoves = [];
    const board = [...initialMove.board];
    for (let i = 0; i < 8; i++){
        board[rowForMove] = [0,0,0,0,0,0,0,0];
        board[rowForMove][i] = 1;
        // TODO: add move validation
        if(isMoveCorrect(board, rowForMove) || !onlyCorrect) {
            possibleMoves.push(new Move(board, rowForMove));
        }
    }
    return possibleMoves
}

const tests = [
    {
        board: [
            [0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        row: 1,
        expected: 8,
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
        expected: 5,
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
        expected: 5,
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
        expected: 5,
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
        expected: 3,
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
        expected: 8,
    },
    {
        board: [
            [1,1,0,1,0,0,0,0],
            [1,0,0,0,0,0,0,0],
            [1,0,1,0,0,0,0,0],
            [1,0,1,1,0,0,0,0],
            [1,0,0,0,0,0,0,0],
            [1,0,0,0,0,1,0,0],
            [1,0,0,0,1,0,0,0],
            [1,0,0,0,0,0,0,0]
        ],
        row: 2,
        expected: 3,
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
        expected: 4,
    },
    {
        board: [
            [1,0,0,0,0,0,0,0],
            [0,1,0,1,1,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        row: 2,
        expected: 2,
    },
    {
        board: [
            [0,0,1,0,0,1,1,1],
            [0,0,0,0,0,0,1,0],
            [0,0,0,0,0,1,1,1],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ],
        row: 1,
        expected: 1,
    },
];

const testsRun = () => {
    const results = [];
    console.log('   Run test for generate moves function:')
    tests.forEach(test => {
        results.push(generateMoves(new Move(test.board),test.row).length === test.expected);
    })
    console.table(results);

}


testsRun();

module.exports = generateMoves;
