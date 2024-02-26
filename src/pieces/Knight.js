import Piece from '../components/Piece.js';

class Knight extends Piece {
    constructor(color) {
        // Use Unicode character for knight
        super(color, color === 'white' ? '\u2658' : '\u265E');
    }

    getLegalMoves(boardState, currentPos) {
        const legalMoves = [];
        const [row, col] = currentPos;

        // All possible "L" moves for a knight
        const moves = [
            [row - 2, col - 1], [row - 2, col + 1],
            [row - 1, col - 2], [row - 1, col + 2],
            [row + 1, col - 2], [row + 1, col + 2],
            [row + 2, col - 1], [row + 2, col + 1]
        ];

        // Filter out moves that are off the board or land on a friendly piece
        moves.forEach(([r, c]) => {
            if (r >= 0 && r < 8 && c >= 0 && c < 8) { // Check if the move is within the board
                const targetSquare = boardState[r][c];
                if (!targetSquare.piece || targetSquare.piece.color !== this.color) { // Square is empty or contains an enemy piece
                    legalMoves.push([r, c]);
                }
            }
        });

        return legalMoves;
    }
}

export default Knight;
