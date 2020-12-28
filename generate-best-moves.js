const isMoveCorrect = require('./is-move-correct');
const Move = require('./move');
const getPairsOfQueens = require('./get-pairs-of-queens');

const generateBestMoves = (initialMove, rowForMove, onlyCorrect = true) => {
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
    // return possibleMoves.sort((m1, m2) => getPairsOfQueens(m1.board) - getPairsOfQueens(m2.board))
    // need to use getPairsOfQueensFunction to get best moves only
    const bestMoves = {};
    possibleMoves.forEach((move) => {
        const score = getPairsOfQueens(move.board);

        if (Array.isArray(bestMoves[score])) {
            bestMoves[score].push(move);
        }else{
            bestMoves[score] = [move];
        }
    });

    const scores = Object.keys(bestMoves);

    const scoresSorted = scores.sort((s1, s2) => s1 - s2);

    let bestScore = scoresSorted[0];

    return bestMoves[bestScore]
}

const tests = [

];

const testsRun = () => {
    const results = [];
    console.log('   Run test for generate moves function:')
    tests.forEach(test => {
        results.push(generateBestMoves(new Move(test.board),test.row).length === test.expected);
    })
    console.table(results);

}


testsRun();

module.exports = generateBestMoves;
