import Piece from '../components/Piece.js';

class Rook extends Piece {
    constructor(color) {
        // Use Unicode character for rook
        super(color, color === 'white' ? '\u2656' : '\u265C');
        this.hasMoved = false; // For castling logic in the future
    }

    getLegalMoves(boardState, currentPos) {
        const legalMoves = [];
        const [row, col] = currentPos;
        const directions = [
            { dr: -1, dc: 0 }, // Up
            { dr: 1, dc: 0 },  // Down
            { dr: 0, dc: -1 }, // Left
            { dr: 0, dc: 1 }   // Right
        ];

        directions.forEach(({ dr, dc }) => {
            let nextRow = row + dr;
            let nextCol = col + dc;
            // Keep moving in the direction until you hit the edge of the board or another piece
            while (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8) {
                if (boardState[nextRow][nextCol].piece) {
                    // If there's a piece of the opposite color, it's a legal capture move
                    if (boardState[nextRow][nextCol].piece.color !== this.color) {
                        legalMoves.push([nextRow, nextCol]);
                    }
                    break; // Stop looking further in this direction
                } else {
                    // The square is empty, so it's a legal move
                    legalMoves.push([nextRow, nextCol]);
                }
                nextRow += dr;
                nextCol += dc;
            }
        });

        return legalMoves;
    }

    move(newPos) {
        this.hasMoved = true;
        // Update the rook's position logic here...
    }
}

export default Rook;