import "./App.css";
import { useEffect, useState } from "react";
import useWindowDimensions from "./Hooks/useWindowDimensions";
import Buttons from "./Components/Buttons";
import Header from "./Components/Header";
import Board from "./Components/Board";

import shortestPath from "./Components/ShortestPath";

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const { height, width } = useWindowDimensions();

  const [count, setCount] = useState(0);
  const [start, setStart] = useState([99, 99]);
  const [end, setEnd] = useState([99, 99]);

  const [row, setRows] = useState(20);
  const [col, setCol] = useState(() => {
    if (width < 1500 && width > 1200) return 30;
    else if (width > 1500) return 50;
    else return 10;
  });

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

  return (
    <div>
      <Header />
      <Board
        end={end}
        start={start}
        refresh={refresh}
        grid={grid}
        count={count}
        col={col}
        row={row}
      />
      <Buttons
        props={{
          setCount: setCount,
          setStart: setStart,
          setEnd: setEnd,
          setGrid: setGrid,
          calculate: () => shortestPath(grid, setGrid, start, end),
          row: row,
          col: col,
        }}
      />
    </div>
  );
}

export default App;
