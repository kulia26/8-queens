class Move {
    constructor(initialState = [
        [1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0]
    ], lastRowMove = 0) {
        this.board = [...initialState];
        this.lastRowMove = lastRowMove;
        this.id = initialState.toString() + lastRowMove.toString();
    }

    getId() {
        return this.id;
    }

    isLastRow() {
        return this.lastRowMove >= 7;
    }

    getLastRowMove() {
        return this.lastRowMove;
    }
}

const testsRun = () => {
    const results = [];
    console.log('   Run test for Move constructor:')
    const m1 = new Move();
    results.push(
        m1.getId() === 0,
        m1.getLastRowMove() === 0,
        m1.isLastRow() === false,
    );
    console.table(results);
}

testsRun();

module.exports = Move;
