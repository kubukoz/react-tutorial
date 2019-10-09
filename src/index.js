import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button >
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const onClick = () => this.props.handleClick(i)

    return (
      <Square
        value={this.props.squares[i]}
        onClick={onClick}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.props.squares)
    const end = this.props.squares.indexOf(null) < 0;
    const status =
      winner ? ('Winner: ' + winner) :
        end ? 'Result: draw' :
          ('Next player: ' + (this.props.xIsNext ? 'X' : 'O'));

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  handleClick(i) {
    const newSquares = this.state.squares.slice()
    if (calculateWinner(newSquares) || newSquares[i]) return;
    newSquares[i] = this.state.xIsNext ? 'X' : 'O'

    this.setState({
      squares: newSquares,
      xIsNext: !this.state.xIsNext
    })
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            xIsNext={this.state.xIsNext}
            handleClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
