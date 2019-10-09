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
    return (
      <div>
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
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    }
  }

  handleClick(i) {
    const squares = this.latestSquares()

    const newSquares = squares.slice()
    if (calculateWinner(newSquares) || newSquares[i]) return;
    newSquares[i] = this.state.xIsNext ? 'X' : 'O'

    this.setState({
      history: this.state.history.concat({ squares: newSquares }),
      xIsNext: !this.state.xIsNext
    })
  }

  latestSquares() {
    return this.state.history[this.state.history.length - 1].squares;
  }

  render() {
    const squares = this.latestSquares()

    const winner = calculateWinner(squares)
    const end = squares.indexOf(null) < 0;

    const status =
      winner ? ('Winner: ' + winner) :
        end ? 'Result: draw' :
          ('Next player: ' + (this.state.xIsNext ? 'X' : 'O'));

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            xIsNext={this.state.xIsNext}
            handleClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
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
