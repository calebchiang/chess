import Piece from '../components/Piece.js';

class Bishop extends Piece {
    constructor(color) {
        // Use Unicode character for bishop
        super(color, color === 'white' ? '\u2657' : '\u265D');
    }

    getLegalMoves(boardState, currentPos) {
        const legalMoves = [];
        const [row, col] = currentPos;
        // Bishops move diagonally, so we check all four diagonal directions
        const directions = [
            { dr: -1, dc: -1 }, // Up-left
            { dr: -1, dc: 1 },  // Up-right
            { dr: 1, dc: -1 },  // Down-left
            { dr: 1, dc: 1 }    // Down-right
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
}

export default Bishop;
