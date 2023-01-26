import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import useWindowDimensions from "./useWindowDimensions";

function App() {
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
    let dist = new Array(n)
      .fill(Infinity)
      .map(() => new Array(m).fill(Infinity));
    let visited = new Array(n).fill(false).map(() => new Array(m).fill(false));
    let directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    let path = [];

    heap.add([0, start[0], start[1]], 0);
    dist[start[0]][start[1]] = 0;

    while (!heap.isEmpty()) {
      let [cost, x, y] = heap.remove();
      visited[x][y] = true;
      if ((x !== start[0] || y !== start[1]) && (x !== end[0] || y !== end[1]))
        grid[x][y] = "p";

      for (let [dx, dy] of directions) {
        let i = x + dx;
        let j = y + dy;
        if (
          i < 0 ||
          i >= n ||
          j < 0 ||
          j >= m ||
          grid[i][j] == 0 ||
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
      if (path[lastStep[0] + "," + lastStep[1]])
        lastStep = path[lastStep[0] + "," + lastStep[1]].split(",").map(Number);
      else break;
    }

    var i = 0; //  set your counter to 1

    function myLoop() {
      //  create a loop function
      setTimeout(function () {
        //  call a 3s setTimeout when the loop is called
        if (start.join(",") !== result[i] && end.join(",") !== result[i])
          grid[result[i].split(",")[0]][result[i].split(",")[1]] = "v";
        i++; //  increment the counter
        setGrid(grid);
        setFlag(!flag);
        if (i < result.length) {
          //  if the counter < 10, call the loop function
          myLoop(); //  ..  again which will trigger another
        } //  ..  setTimeout()
      }, 30);
    }

    myLoop();
  };

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const { height, width } = useWindowDimensions();

  const [count, setCount] = useState(0);
  const [paint, setPaint] = useState(false);
  const [flag, setFlag] = useState(true);
  const [start, setStart] = useState([99, 99]);
  const [end, setEnd] = useState([99, 99]);
  const [view, setView] = useState(false);

  const [row, setRows] = useState(20);
  const [col, setCol] = useState(() => {
    if (width < 1500 && width > 1200) return 30;
    else if (width > 1500) return 50;
    else return 10;
  });

  useEffect(() => {
    if (width < 1500 && width > 1200) {
      setCol(30);
      setRows(20);
      setGrid(
        Array(row)
          .fill(1)
          .map((x) => Array(col).fill(1))
      );
      setFlag(!flag);
    } else if (width > 1500) {
      setCol(50);
      setRows(20);
      setGrid(
        Array(row)
          .fill(1)
          .map((x) => Array(col).fill(1))
      );
      setFlag(!flag);
    } else {
      setCol(10);
      setRows(20);
      setGrid(
        Array(row)
          .fill(1)
          .map((x) => Array(col).fill(1))
      );
      setFlag(!flag);
    }
  }, []);

  const [grid, setGrid] = useState(
    Array(row)
      .fill(1)
      .map((x) => Array(col).fill(1))
  );

  const refresh = ([i, j]) => {
    let c = count;
    if (c === 0) setStart([i, j]);
    if (c === 1) setEnd([i, j]);
    if (c > 1) grid[i][j] = 0;
    setCount(c + 1);
    setGrid(grid);
  };

  const calculate = () => {
    console.log(shortestPath(grid));
  };

  return (
    <div>
        <div>
          <div id="popup1" class="overlay">
            <div class="popup">
              <h2>Hey</h2>
              <a class="close" href="#">
                &times;
              </a>
              <div class="content">
                Developed by Swapnil. <br /><br />Dijkstra's Algorithm finds the shortest path between a given node (which is called the "source node") and all other nodes in a graph.<br/>This algorithm uses the weights of the edges to find the path that minimizes the total distance (weight) between the source node and all other nodes.
              </div>
            </div>
          </div>
        </div>
      <div id="header">
        <h1>Very Short Path</h1>
        <p>
          &nbsp; found by Swapnil
          <a className="box" id="info" href="#popup1">
            ⓘ
          </a>
        </p>
      </div>
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${col}, 1fr)`,
          gridTemplateRows: `repeat(${row}, 1fr)`,
        }}
      >
        {grid.map((r, i) => {
          return r.map((e, j) => {
            if (e === 1) {
              if (i == start[0] && j == start[1])
                return (
                  <button
                    className="element"
                    id="source"
                    key={i + "-" + j}
                    onClick={() => {
                      refresh([i, j]);
                    }}
                  >
                    {}
                  </button>
                );
              else if (end.join(",") === i + "," + j)
                return (
                  <button
                    className="element"
                    id="destination"
                    key={i + "-" + j}
                    onClick={() => {
                      refresh([i, j]);
                    }}
                  >
                    {}
                  </button>
                );
              return (
                <button
                  className="element"
                  id="unselected"
                  key={i + "-" + j}
                  onMouseMove={() => {
                    if (count > 1) refresh([i, j]);
                  }}
                  onClick={() => {
                    if (count <= 1) refresh([i, j]);
                  }}
                >
                  {}
                </button>
              );
            }
            if (e === 0) {
              if (i == start[0] && j == start[1])
                return (
                  <button
                    className="element"
                    id="source"
                    key={i + "-" + j}
                    onClick={() => {
                      refresh([i, j]);
                    }}
                  >
                    {}
                  </button>
                );
              else if (end.join(",") === i + "," + j)
                return (
                  <button
                    className="element"
                    id="destination"
                    key={i + "-" + j}
                    onClick={() => {
                      refresh([i, j]);
                    }}
                  >
                    {}
                  </button>
                );
              return (
                <button
                  className="element"
                  id="selected"
                  key={i + "-" + j}
                  onClick={() => {
                    refresh([i, j]);
                  }}
                >
                  {}
                </button>
              );
            }

            if (e == "v")
              return (
                <button
                  className="element"
                  id="visited"
                  key={i + "-" + j}
                  onClick={() => {
                    refresh([i, j]);
                  }}
                >
                  {}
                </button>
              );
            if (e == "p")
              return (
                <button
                  className="element"
                  id="path"
                  key={i + "-" + j}
                  onClick={() => {
                    refresh([i, j]);
                  }}
                >
                  {}
                </button>
              );
          });
        })}
      </div>
      <br />
      <div className="button-dev">
        <button
          className="button"
          onClick={() => {
            calculate();
          }}
        >
          Calculate
        </button>
        <button
          className="button"
          onClick={() => {
            setStart([99, 99]);
            setEnd([99, 99]);
            setCount(0);
            setGrid(
              Array(row)
                .fill(1)
                .map((x) => Array(col).fill(1))
            );
          }}
        >
          Clear
        </button>
      </div>

      {/* <div>
      width: {width} ~ height: {height}
    </div> */}
      <br />
    </div>
  );
}

export default App;
