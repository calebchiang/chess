import React, { useState } from 'react';
import Square from './Square';
import Pawn from '../pieces/Pawn.js';
import Rook from '../pieces/Rook.js';
import Knight from '../pieces/Knight.js';
import Bishop from '../pieces/Bishop.js';
import Queen from '../pieces/Queen.js';
import King from '../pieces/King.js';
import '../styles/Board.css';
import '../styles/Piece.css';

const Board = () => {
    const initialBoardState = Array(8).fill(null).map((_, rowIndex) =>
        Array(8).fill(null).map((_, colIndex) => {
            const squareColor = (rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark';

            if (rowIndex === 6) {
                return { piece: new Pawn('white'), color: squareColor };
            } else if (rowIndex === 1) {
                return { piece: new Pawn('black'), color: squareColor };
            } else if ((rowIndex === 0 || rowIndex === 7) && (colIndex === 0 || colIndex === 7)) {
                const color = rowIndex === 0 ? 'black' : 'white';
                return { piece: new Rook(color), color: squareColor };
            } else if ((rowIndex === 0 || rowIndex === 7) && (colIndex === 1 || colIndex === 6)) {
                const color = rowIndex === 0 ? 'black' : 'white';
                return { piece: new Knight(color), color: squareColor };
            } else if ((rowIndex === 0 || rowIndex === 7) && (colIndex === 2 || colIndex === 5)) {
                const color = rowIndex === 0 ? 'black' : 'white';
                return { piece: new Bishop(color), color: squareColor };
            } else if ((rowIndex === 0 || rowIndex === 7) && colIndex === 3) {
                const color = rowIndex === 0 ? 'black' : 'white';
                return { piece: new Queen(color), color: squareColor };
            } else if ((rowIndex === 0 || rowIndex === 7) && colIndex === 4) {
                // Place kings
                const color = rowIndex === 0 ? 'black' : 'white';
                return { piece: new King(color), color: squareColor };
            } else {
                return { piece: null, color: squareColor };
            }
        })
    );

    const [boardState, setBoardState] = useState(initialBoardState);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [highlightedSquares, setHighlightedSquares] = useState([]);

    const handleSquareClick = (rowIndex, colIndex) => {
        console.log(`Square clicked at [${rowIndex}, ${colIndex}]`);
        const square = boardState[rowIndex][colIndex];
        if (square.piece && (selectedPiece === null || square.piece.color !== selectedPiece.piece.color)) {
            // Highlight legal moves for the selected piece
            const legalMoves = square.piece.getLegalMoves(boardState, [rowIndex, colIndex]);
            setHighlightedSquares(legalMoves);
            setSelectedPiece({ piece: square.piece, position: [rowIndex, colIndex] });
        } else if (selectedPiece && highlightedSquares.some(([r, c]) => r === rowIndex && c === colIndex)) {
            // Move the piece if the clicked square is a highlighted legal move
            executeMove(selectedPiece.position, [rowIndex, colIndex]);
        } else {
            // Clear selection if clicking on an empty square or a square with a piece of the same color
            setHighlightedSquares([]); // Clear highlighted squares
            setSelectedPiece(null); // Deselect any selected piece
        }
    };

    const executeMove = (fromPos, toPos) => {
        const newBoardState = [...boardState];
        const [fromRow, fromCol] = fromPos;
        const [toRow, toCol] = toPos;
        const movedPiece = newBoardState[fromRow][fromCol].piece;

        // Move piece to the new position
        newBoardState[toRow][toCol] = { ...newBoardState[toRow][toCol], piece: movedPiece };
        // Remove piece from the old position
        newBoardState[fromRow][fromCol] = { ...newBoardState[fromRow][fromCol], piece: null };

        // Update state
        setBoardState(newBoardState);
        setHighlightedSquares([]);
        setSelectedPiece(null);

        // Additional logic here for special moves, checks, etc.
    };


    const renderSquare = (rowIndex, colIndex) => {
        const square = boardState[rowIndex][colIndex];
        const isHighlighted = highlightedSquares.some(([r, c]) => r === rowIndex && c === colIndex);

        return (
            <Square
                key={`${rowIndex}-${colIndex}`}
                colour={square.color}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
                highlighted={isHighlighted} // Pass this prop to your Square component
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
