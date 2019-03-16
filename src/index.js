import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* 
Square Component for the square blocks on the board
In Reacts term, the square component is a "controlled component" as being controlled by the Board component.
*/
/* class Square extends React.Component {
    // Reacts way to remember things, this.state = (remember_this).
    // Commented because Square class no longer stores the state.

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         value: null,
    //     };
    // }

    render() {
        return (
            <button
                className="square"
                onClick={
                    () => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
} */

// Updating the square component to a functional component as it has no state of its own.

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}>
            {props.value}
        </button>
    )
}

// Board component for the board which holds all the Squares
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    // Here we are taking a copy of the sqaures and mutating the data to maintain the changes of the object
    handleClick(i) {
        const squares = this.state.squares.slice();
        if(findingTheWinner(squares)||squares[i]){
            return;
        }
        var xCurrentState = this.state.xIsNext;
        squares[i] = xCurrentState ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !xCurrentState,
        })
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        console.log('this.state.squares:', this.state.squares);
        //Finding the winner
        const winner= findingTheWinner(this.state.squares);
        let status;
        if(winner){
            status='Winner is: '+winner;
        } else {
            status = 'Next Player: '+(this.state.xIsNext?'X':'O');
        }
        return (
            <div>
                <div className="status">
                    {status}
                </div>
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

// Game Component that holds the Board and the board holds the squares
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>
                        {}
                    </div>
                    <ol></ol>
                </div>
            </div>
        );
    }
}

/*
Function component to find the winner of the ticTac game
*/
function findingTheWinner(squares) {
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
        console.log([a, b, c]);
        console.log('a',squares[a]);
        console.log('b',squares[b]);
        console.log('c',squares[c]);
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

ReactDOM.render(
    <Game />, document.getElementById('root')
);