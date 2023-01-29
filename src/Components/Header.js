function Header({ props }) {
  return (
    <div className="Header">
      <div>
        <div id="popup1" class="overlay">
          <div class="popup">
            <h2>Hey</h2>
            <a class="close" href="#">
              &times;
            </a>
            <div class="content">
              Developed by Swapnil. <br />
              <br />
              Dijkstra's Algorithm finds the shortest path between a given node
              (which is called the "source node") and all other nodes in a
              graph.
              <br />
              This algorithm uses the weights of the edges to find the path that
              minimizes the total distance (weight) between the source node and
              all other nodes.
            </div>
          </div>
        </div>
      </div>
      <div id="header">
        <h1>Very Short Path</h1>
        <p>
          &nbsp; found by Swapnil
          <a id="info" href="#popup1">
            &nbsp;ⓘ
          </a>
        </p>
      </div>
    </div>
  );
}

export default Header;
