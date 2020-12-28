const Move = require('./move');
const generateBestMoves = require('./generate-best-moves');
const generateMoves = require('./generate-moves');

const generateAStarAdjacencyList = (head = new Move()) => {

    // generate graph head (initial move)
    const adj = {};
    const id = head.getId();
    adj[id] = [...generateBestMoves(head, head.getLastRowMove() + 1, false)];


    let queue = [];
    queue.push(...adj[id]);

    while (queue.length > 0) {
        const move = queue.pop();
        const id = move.getId();

        if(!move.isLastRow() && !adj[id]) {
            const row = move.getLastRowMove() + 1;
            const states = generateBestMoves(move, row);
            adj[id] = [...states];
            queue.unshift(...states);
        }
    }

    return adj;
}

module.exports = generateAStarAdjacencyList;
