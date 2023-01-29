import Button from "./Button";

function Board({ end, start, refresh, grid, count, col, row }) {
  return (
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
            return (
              <Button
                i={i}
                j={j}
                props={{
                  elementClass: "element",
                  elementId:
                    i == start[0] && j == start[1]
                      ? "source"
                      : end.join(",") === i + "," + j
                      ? "destination"
                      : "unselected",
                  elementFunction:
                    (i == start[0] && j == start[1]) ||
                    end.join(",") === i + "," + j
                      ? () => refresh([i, j])
                      : count <= 1
                      ? () => refresh([i, j])
                      : () => {},
                  elementDraw:
                    (i == start[0] && j == start[1]) ||
                    end.join(",") === i + "," + j
                      ? () => {}
                      : count > 1
                      ? () => refresh([i, j])
                      : () => {},
                  elementContent: "",
                }}
              />
            );
          }
          if (e === 0) {
            return (
              <Button
                i={i}
                j={j}
                props={{
                  elementClass: "element",
                  elementId:
                    i == start[0] && j == start[1]
                      ? "source"
                      : end.join(",") === i + "," + j
                      ? "destination"
                      : "selected",
                  elementFunction: () => refresh([i, j]),
                  elementContent: "",
                }}
              />
            );
          }

          return (
            <Button
              i={i}
              j={j}
              props={{
                elementClass: "element",
                elementId: e == "v" ? "visited" : "path",
                elementFunction: () => refresh([i, j]),
                elementContent: "",
              }}
            />
          );
        });
      })}
    </div>
  );
}

export default Board;
