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
    const [currentPlayer, setCurrentPlayer] = useState('white');


    const handleSquareClick = (rowIndex, colIndex) => {
        console.log(`Square clicked at [${rowIndex}, ${colIndex}]`);
        const square = boardState[rowIndex][colIndex];

        console.log(`Current player: ${currentPlayer}`);
        console.log(`Piece at clicked square: `, square.piece ? square.piece.color : "none");

        // This check is for when a piece is already selected and a legal move is clicked.
        if (selectedPiece && highlightedSquares.some(([r, c]) => r === rowIndex && c === colIndex)) {
            console.log(`Executing move from [${selectedPiece.position}] to [${rowIndex}, ${colIndex}]`);
            executeMove(selectedPiece.position, [rowIndex, colIndex]);
            // Assuming togglePlayer is correctly called within executeMove, so it's not needed here.
        }
        // Check if it's the current player's piece and either select it or show legal moves.
        else if (square.piece && square.piece.color === currentPlayer) {
            console.log(`It's ${currentPlayer}'s turn and they clicked on their ${square.piece.color} piece.`);
            const legalMoves = square.piece.getLegalMoves(boardState, [rowIndex, colIndex]);
            console.log(`Setting legal moves for selected piece:`, legalMoves);
            setHighlightedSquares(legalMoves);
            setSelectedPiece({ piece: square.piece, position: [rowIndex, colIndex] });
        } else {
            // Clear selection if clicking on an empty square or an opponent's piece without making a move
            console.log("Clicked on an empty square or an opponent's piece. Clearing selections.");
            setHighlightedSquares([]);
            setSelectedPiece(null);
        }
    };


    const togglePlayer = () => {
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    };


    const executeMove = (fromPos, toPos) => {
        const newBoardState = boardState.map(row => row.map(cell => ({...cell})));
        const [fromRow, fromCol] = fromPos;
        const [toRow, toCol] = toPos;

        const movedPiece = newBoardState[fromRow][fromCol].piece;

        // Update the firstMove property if the piece is a Pawn
        if (movedPiece instanceof Pawn) {
            movedPiece.move([toRow, toCol]); // This will set firstMove to false
        }

        newBoardState[toRow][toCol].piece = movedPiece;
        newBoardState[fromRow][fromCol].piece = null;

        setBoardState(newBoardState);
        setHighlightedSquares([]);
        setSelectedPiece(null);

        togglePlayer();
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
