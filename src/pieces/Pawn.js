import Piece from '../components/Piece.js';

class Pawn extends Piece {
    constructor(color) {
        // Use Unicode character for pawn
        super(color, color === 'white' ? '\u2659' : '\u265F');
        this.firstMove = true;
    }

    getLegalMoves(boardState, currentPos) {
        const legalMoves = [];
        const direction = this.color === 'white' ? -1 : 1; // White moves up, Black moves down
        const startRow = this.color === 'white' ? 6 : 1; // Starting rows for White and Black pawns
        const [row, col] = currentPos;

        // Forward move
        if (!boardState[row + direction][col]) {
            legalMoves.push([row + direction, col]);
            // Two-square initial move
            if (this.firstMove && !boardState[row + 2 * direction][col]) {
                legalMoves.push([row + 2 * direction, col]);
            }
        }

        // Captures
        const captures = [
            [row + direction, col - 1], // Diagonal left
            [row + direction, col + 1], // Diagonal right
        ];
        captures.forEach(([r, c]) => {
            if (boardState[r] && boardState[r][c] && boardState[r][c].color !== this.color) {
                legalMoves.push([r, c]);
            }
        });

        return legalMoves;
    }

    // Move pawn and update firstMove flag
    move(newPos) {
        this.firstMove = false; // The pawn has now moved
        // Update the pawn's position logic here...
    }
}

export default Pawn;
