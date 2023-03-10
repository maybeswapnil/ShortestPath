class PriorityQueue {
  constructor() {
    this.data = [];
  }

  add(item, priority) {
    this.data.push([item, priority]);
    this.data.sort((a, b) => a[1] - b[1]);
  }

  remove() {
    return this.data.shift()[0];
  }

  peek() {
    return this.data[0];
  }

  isEmpty() {
    return !this.data.length;
  }
}

const shortestPath = (grid) => {
  let n = grid.length;
  let m = grid[0].length;
  let heap = new PriorityQueue();
  let dist = new Array(n).fill(Infinity).map(() => new Array(m).fill(Infinity));
  let visited = new Array(n).fill(false).map(() => new Array(m).fill(false));
  let directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let start = [0, 0];
  let end = [n - 1, m - 1];
  let path = [];

  heap.add([0, start[0], start[1]], 0);
  dist[start[0]][start[1]] = 0;

  while (!heap.isEmpty()) {
    let [cost, x, y] = heap.remove();
    visited[x][y] = true;

    for (let [dx, dy] of directions) {
      let i = x + dx;
      let j = y + dy;
      if (
        i < 0 ||
        i >= n ||
        j < 0 ||
        j >= m ||
        grid[i][j] === 0 ||
        visited[i][j]
      )
        continue;
      let newCost = cost + 1;
      if (newCost < dist[i][j]) {
        dist[i][j] = newCost;
        heap.add([newCost, i, j], newCost);
        path[i + "," + j] = x + "," + y;
      }
    }
  }
  let shortest = dist[end[0]][end[1]];
  let result = [end[0] + "," + end[1]];
  let lastStep = end;
  while (lastStep[0] + "," + lastStep[1] !== start[0] + "," + start[1]) {
    result.unshift(path[lastStep[0] + "," + lastStep[1]]);
    console.log(lastStep, path)
    if (path[lastStep[0] + "," + lastStep[1]]) lastStep = path[lastStep[0] + "," + lastStep[1]].split(",").map(Number);
    else break;
  }
  console.log("Shortest path: " + result);
  console.log("Shortest distance: " + shortest);
};

let grid = [
  [1, 1, 1, 0],
  [0, 1, 1, 1],
  [0, 0, 0, 1],
  [1, 1, 1, 1],
];

shortestPath(grid);
