import React, { useState } from 'react';
import Square from './Square'; // Ensure the path is correct based on your project structure
import Pawn from '../pieces/Pawn.js'; // Adjust the path as necessary
import '../styles/Board.css';
import '../styles/Piece.css';

const Board = () => {
    // Initialize the board state with Pawns and colors
    const initialBoardState = Array(8).fill(null).map((_, rowIndex) =>
        Array(8).fill(null).map((_, colIndex) => {
            if (rowIndex === 6) {
                return new Pawn('white');
            } else if (rowIndex === 1) { // Make sure this line is correct for placing black pawns
                return new Pawn('black');
            } else {
                return (rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark';
            }
        })
    );

    const [boardState, setBoardState] = useState(initialBoardState);

    // Function to handle square clicks
    const handleSquareClick = (rowIndex, colIndex) => {
        const squareContent = boardState[rowIndex][colIndex];
        if (squareContent instanceof Pawn) { // Check if the square contains a pawn
            const legalMoves = squareContent.getLegalMoves(boardState, [rowIndex, colIndex]);
            console.log(`Legal moves for pawn at [${rowIndex}, ${colIndex}]:`, legalMoves);
        }
    };

    // Function to render a square
    const renderSquare = (rowIndex, colIndex) => {
        const squareContent = boardState[rowIndex][colIndex];
        // Determine the square's color based on its position, not its content
        const squareColor = (rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark';

        return (
            <Square
                key={`${rowIndex}-${colIndex}`}
                colour={squareColor} // Pass the correct color based on position
                onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
                {/* Render the pawn's Unicode character if there's a pawn */}
                {squareContent instanceof Pawn ? (
                    <span className="chess-piece">
                    {squareContent.getIcon()}
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
