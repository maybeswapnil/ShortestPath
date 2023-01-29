function Buttons({props}) {

  const calculate = props.calculate;
  const setCount = props.setCount;
  const setStart = props.setStart;
  const setEnd = props.setEnd;
  const setGrid = props.setGrid;
  const col = props.col;
  const row = props.row;

  return (
    <div className="Buttons">
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
  );
}

export default Buttons;
