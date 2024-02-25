import React, { useState } from 'react';
import Square from './Square'; // Ensure the path is correct based on your project structure
import Pawn from '../pieces/Pawn.js'; // Adjust the path as necessary
import '../styles/Board.css';
import '../styles/Piece.css';

const Board = () => {
    // Initialize the board state with Pawns and colors
    const initialBoardState = Array(8).fill(null).map((_, rowIndex) =>
        Array(8).fill(null).map((_, colIndex) => {
            // Assign the square color based on the position
            const squareColor = (rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark';

            if (rowIndex === 6) {
                // Place a white pawn
                return { piece: new Pawn('white'), color: squareColor };
            } else if (rowIndex === 1) {
                // Place a black pawn
                return { piece: new Pawn('black'), color: squareColor };
            } else {
                // Empty square
                return { piece: null, color: squareColor };
            }
        })
    );


    const [boardState, setBoardState] = useState(initialBoardState);

    const handleSquareClick = (rowIndex, colIndex) => {
        const square = boardState[rowIndex][colIndex];
        if (square.piece instanceof Pawn) {
            const legalMoves = square.piece.getLegalMoves(boardState, [rowIndex, colIndex]);
            console.log(`Legal moves for pawn at [${rowIndex}, ${colIndex}]:`, legalMoves);
        }
    };

    const renderSquare = (rowIndex, colIndex) => {
        const square = boardState[rowIndex][colIndex];
        return (
            <Square
                key={`${rowIndex}-${colIndex}`}
                colour={square.color}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
                {square.piece ? (
                    <span className="chess-piece">
                    {square.piece.getIcon()}
                </span>
                ) : ''}
            </Square>
        );
    };


    // Render the board with all squares
    return (
        <div className="board">
            {boardState.map((row, rowIndex) =>
                row.map((_, colIndex) => renderSquare(rowIndex, colIndex))
            )}
        </div>
    );
};

export default Board;
