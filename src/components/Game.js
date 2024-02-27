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

    isKingInCheck(color) {
        const kingPosition = this.findKing(color);
        if (!kingPosition) {
            // Handle the case where the king's position is not found or return a default value
            console.error(`King of color ${color} not found.`);
            return false; // Assuming the king is not in check if its position cannot be determined
        }
        const [kingRow, kingCol] = kingPosition;

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

    isSquareAttacked(position, color) {
        const [row, col] = position;
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const square = this.boardState[r][c];
                if (square.piece && square.piece.color !== color) {
                    const legalMoves = square.piece.getLegalMoves(this.boardState, [r, c]);
                    if (legalMoves.some(([moveRow, moveCol]) => moveRow === row && moveCol === col)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isCheckmate(color) {
        // Step 1: Verify if the king is in check.
        if (!this.isKingInCheck(color)) {
            return false; // Not a checkmate if the king is not in check.
        }

        const kingPosition = this.findKing(color);
        if (!kingPosition) {
            console.error(`King of color ${color} not found.`);
            return false; // Assuming it's not a checkmate if the king's position cannot be determined.
        }

        const [kingRow, kingCol] = kingPosition;
        const king = this.boardState[kingRow][kingCol].piece;

        // Step 2: Determine if the king can move to a square that is not under attack.
        const kingMoves = king.getLegalMoves(this.boardState, kingPosition);
        for (const [moveRow, moveCol] of kingMoves) {
            if (!this.isSquareAttacked([moveRow, moveCol], color)) {
                return false; // The king has at least one safe move.
            }
        }

        // Simplified Step 3: For this example, we'll only check for direct captures, not blocks
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = this.boardState[row][col];
                if (square.piece && square.piece.color === color) {
                    const legalMoves = square.piece.getLegalMoves(this.boardState, [row, col]);
                    for (const [moveRow, moveCol] of legalMoves) {
                        const targetSquare = this.boardState[moveRow][moveCol];
                        if (targetSquare.piece && targetSquare.piece.color !== color) {
                            // Simulate capture
                            const originalPiece = targetSquare.piece;
                            targetSquare.piece = square.piece; // Capture
                            if (!this.isKingInCheck(color)) { // Check if the king is still in check after the capture
                                targetSquare.piece = originalPiece; // Undo capture
                                return false; // The king is not in checkmate because a capture can save him.
                            }
                            targetSquare.piece = originalPiece; // Undo capture
                        }
                    }
                }
            }
        }

        // If no move can save the king, it's a checkmate.
        return true;
    }
}
