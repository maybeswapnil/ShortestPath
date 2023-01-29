function Button({ props }, i, j) {
  return (
    <button
      className={props.elementClass}
      id={props.elementId}
      key={i + "-" + j}
      onClick={props.elementFunction}
      onMouseMove={props.elementDraw}
    >
      {props.elementContent}
    </button>
  );
}

export default Button;
