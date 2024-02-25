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
        const [row, col] = currentPos;

        // Forward move (one square)
        if (boardState[row + direction] && boardState[row + direction][col].piece === null) {
            legalMoves.push([row + direction, col]);

            // Initial two-square move (only if the first move is also clear)
            if (this.firstMove && boardState[row + 2 * direction][col].piece === null) {
                legalMoves.push([row + 2 * direction, col]);
            }
        }

        // Diagonal captures
        const diagonalOffsets = [-1, 1];
        diagonalOffsets.forEach(offset => {
            const diagRow = row + direction;
            const diagCol = col + offset;
            if (diagRow >= 0 && diagRow < 8 && diagCol >= 0 && diagCol < 8) {
                const diagSquare = boardState[diagRow][diagCol];
                if (diagSquare.piece && diagSquare.piece.color !== this.color) {
                    legalMoves.push([diagRow, diagCol]);
                }
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
