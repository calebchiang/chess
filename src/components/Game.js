import King from '../pieces/King.js';

export class Game {
    constructor(boardState) {
        this.boardState = boardState;
    }

    // Finds the position of the king for the given color
    findKing(color) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = this.boardState[row][col];
                if (square.piece && square.piece instanceof King && square.piece.color === color) {
                    return [row, col];
                }
            }
        }
        return null; // Should never happen if the king is always on the board
    }

    // Determines if the specified color's king is in check
    isKingInCheck(color) {
        const [kingRow, kingCol] = this.findKing(color);
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = this.boardState[row][col];
                if (square.piece && square.piece.color !== color) {
                    const legalMoves = square.piece.getLegalMoves(this.boardState, [row, col]);
                    if (legalMoves.some(([r, c]) => r === kingRow && c === kingCol)) {
                        return true; // The king is in check
                    }
                }
            }
        }
        return false; // The king is not in check
    }
}
