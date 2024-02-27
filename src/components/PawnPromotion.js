import React from 'react';
import Rook from '../pieces/Rook.js';
import Knight from '../pieces/Knight.js';
import Bishop from '../pieces/Bishop.js';
import Queen from '../pieces/Queen.js';


export const PawnPromotionOptions = ({ onPromote }) => (
    <div className="pawn-promotion-options">
        <button onClick={() => onPromote('Queen')}>Queen</button>
        <button onClick={() => onPromote('Rook')}>Rook</button>
        <button onClick={() => onPromote('Bishop')}>Bishop</button>
        <button onClick={() => onPromote('Knight')}>Knight</button>
    </div>
);

export const handlePromotionChoice = (choice, pawnPromotion, setBoardState, boardState, setPawnPromotion, togglePlayer) => {
    const [promoRow, promoCol] = pawnPromotion.toPos;
    let newPiece;
    switch (choice) {
        case 'Queen':
            newPiece = new Queen(pawnPromotion.color);
            break;
        case 'Rook':
            newPiece = new Rook(pawnPromotion.color);
            break;
        case 'Bishop':
            newPiece = new Bishop(pawnPromotion.color);
            break;
        case 'Knight':
            newPiece = new Knight(pawnPromotion.color);
            break;
        default:
            newPiece = new Queen(pawnPromotion.color); // Default to Queen
    }
    const newBoardState = [...boardState];
    newBoardState[promoRow][promoCol].piece = newPiece;
    setBoardState(newBoardState);
    setPawnPromotion(null); // Reset pawnPromotion state
    togglePlayer();
};
