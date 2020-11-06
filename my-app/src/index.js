import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className={lineofSquares(props.thesquares, props.spot)? 'square' : 'winsquare'} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
          spot = {i}
          thesquares = {this.props.squares}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {createBoard(3, 3, this)}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          rowcol: null
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          rowcol: i
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  order(oldorder) {
    this.setState({
      order: !oldorder
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let moves;

    if(this.state.order){
      moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + (history.length - move) + findrowcol(history[move].rowcol):
        'Go to game start';
      return (
        <li key={move}>
          <button className={this.state.stepNumber === (history.length-move) ? 'selected' : ''} onClick={() => this.jumpTo(history.length-move)}>{desc}</button>
        </li>
      );
    });
    }
    else{
      moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + findrowcol(history[move].rowcol):
        'Go to game start';
      return (
        <li key={move}>
          <button className={this.state.stepNumber === move ? 'selected' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    }

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    let orderStr;
    if(this.state.order){
      orderStr = "Descending"
    }
    else{
      orderStr = "Ascending"
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>
            {moves}
             <button onClick={() => this.order(this.state.order)}>{orderStr}</button>
          </ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function createBoard(row, col, obj){
  const items = []
  let i;
  let t;
  let count = 0;
  for (i = 0; i < row; i++) {
    items.push(<div className="board-row"></div>)
    for (t = 0; t < col; t++) {
      items.push(obj.renderSquare(count))
      count = count + 1
    }
  items.push(<div></div>)
  }
  return items
}

function findrowcol(index) {
  if(index === null){
    return ""
  }
  if(index === 0){
    return "(0, 0)"
  }
  if(index === 1){
    return "(0, 1)"
  }
  if(index === 2){
    return "(0, 2)"
  }
  if(index === 3){
    return "(1, 0)"
  }
  if(index === 4){
    return "(1, 1)"
  }
  if(index === 5){
    return "(1, 2)"
  }
  if(index === 6){
    return "(2, 0)"
  }
  if(index === 7){
    return "(2, 1)"
  }
  if(index === 8){
    return "(2, 2)"
  }
}

function lineofSquares(squares, spot) {
  let winningLine = 1;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winningLine = lines[i];
    }
  }
  if(winningLine !== 1) {
    for (let i = 0; i < winningLine.length; i++) {
      if (winningLine[i] !== spot) {
        return true;
      }
    }
  }
  return false;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
