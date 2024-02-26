import Piece from '../components/Piece.js';

class King extends Piece {
    constructor(color) {
        // Use Unicode character for king
        super(color, color === 'white' ? '\u2654' : '\u265A');
    }

    getLegalMoves(boardState, currentPos) {
        const legalMoves = [];
        const [row, col] = currentPos;
        // The king can move one square in any direction
        const moves = [
            [row - 1, col], [row + 1, col], // Vertical
            [row, col - 1], [row, col + 1], // Horizontal
            [row - 1, col - 1], [row - 1, col + 1], // Diagonal up
            [row + 1, col - 1], [row + 1, col + 1]  // Diagonal down
        ];

        moves.forEach(([r, c]) => {
            // Check if the move is within the board
            if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                const targetSquare = boardState[r][c];
                // Square is empty or contains an enemy piece
                if (!targetSquare.piece || targetSquare.piece.color !== this.color) {
                    legalMoves.push([r, c]);
                }
            }
        });

        return legalMoves;
    }
}

export default King;
