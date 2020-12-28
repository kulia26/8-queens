const isSolution = require('./is-solution');
const generateAdjacencyList = require('./generate-adjacency-list');

// Алгоритм працює зі списком суміжності вершин
// наприклад, таким: adj = {A:[B,C,D], B:[E,F], ... }
const bfs = (head) => {
    // adj - смежный список
    const adj = generateAdjacencyList(head);

    // index - index начальная вершина
    const firstIndex = Object.keys(adj)[0];

    // инициализируем очередь
    let queue = [];
    let visited = [];
    let maxVerticesCount = 0;
    let generatedVerticesCount = 0;
    // добавляем s в очередь
    queue.push(firstIndex)
    // помечаем s как посещенную вершину во избежание повторного добавления в очередь
    visited.push(firstIndex);
    while(queue.length > 0) {
        // удаляем первый (верхний) элемент из очереди
        let vIndex = queue.shift()
        // abj[vIndex] - соседи v
        if(adj[vIndex]) {
            for(let move of adj[vIndex]) {
                // если сосед не посещался
                if(!visited.includes(move.getId())) {
                    // добавляем его в очередь
                    queue.push(move.getId())
                    if(queue.length > maxVerticesCount) {
                        maxVerticesCount = queue.length;
                    }
                    generatedVerticesCount++;
                    // помечаем вершину как посещенную
                    // move.visited = true
                    visited.push(move.getId());
                    // если сосед является пунктом назначения isSolution, мы победили
                    if(isSolution(move.board)) {
                        return {
                            goalState: move.getId(),
                            maxVerticesCount,
                            generatedVerticesCount
                        }
                    }
                }
            }
        }

    }
    // если isSolution не обнаружено, значит пункта назначения достичь невозможно
    return {
        goalState: null,
        maxVerticesCount,
        generatedVerticesCount
    }
}

module.exports = bfs;
