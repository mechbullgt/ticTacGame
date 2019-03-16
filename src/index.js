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
    // State management is now with the Game component
    /*     constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    } */

    // Here we are taking a copy of the sqaures and mutating the data to maintain the changes of the object
    // Moved handleClick to Game Component
/*     handleClick(i) {
        const squares = this.props.squares.slice();
        if (findingTheWinner(squares) || squares[i]) {
            return;
        }
        var xCurrentState = this.props.xIsNext;
        squares[i] = xCurrentState ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !xCurrentState,
        })
    } */

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        // No need to find the winner and game status here as Game component is handling this.
        /*         console.log('this.state.squares:', this.state.squares);
                //Finding the winner
                const winner= findingTheWinner(this.state.squares);
                let status;
                if(winner){
                    status='Winner is: '+winner;
                } else {
                    status = 'Next Player: '+(this.state.xIsNext?'X':'O');
                }
         */
        return (
            <div>
                {/*<div className="status">
                    {status}
                </div> */}
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

/* 
1. Game Component that holds the Board and the board holds the squares
2. Lifting the state up from Boards component to the Game component to give it control over the Board component
*/
class Game extends React.Component {
    // Adding constructor to maintain the states
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber:0,
            xIsNext: true,
        };
    }

    handleClick(i){
        const history= this.state.history.slice(0,this.state.stepNumber+1);
        const current= history[history.length-1];
        const squares= current.squares.slice();
        if(findingTheWinner(squares) || squares[i]){
            return;
        };
        squares[i]=this.state.xIsNext?'X':'O';
        this.setState({
            history:history.concat([{
                squares:squares,
            }]),
            stepNumber:history.length,
            xIsNext:!this.state.xIsNext,
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext:(step%2)===0,
        });
    }

    render() {
        const history = this.state.history;
        // const current = history[history.length - 1];
        const current = history[this.state.stepNumber];
        const winner = findingTheWinner(current.squares);
        // For the timeline feature
        const moves = history.map((step,move)=>{
        var desc = move ? 'Go to move #'+move:'Go to game start';
        if(!winner && move){
            desc+='';
        } else if (!move) {
            desc='Game Start';
        } 
        // else{
        //     desc='Game Over';
        // }
        // let desc=!winner?'Go to move #'+move:'Game Over, Start New Game';
            return (
                <li><button 
                    key={move}
                    onClick={()=>this.jumpTo(move)}>
                    {desc}
                    </button>    
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner is: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <h1>Parent Game Component</h1>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>
                        {status}
                    </div>
                    <ol>{moves}</ol>
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
        console.log('a', squares[a]);
        console.log('b', squares[b]);
        console.log('c', squares[c]);
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

ReactDOM.render(
    <Game />, document.getElementById('root')
);