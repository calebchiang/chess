import Piece from '../components/Piece.js';

class Queen extends Piece {
    constructor(color) {
        // Use Unicode character for queen
        super(color, color === 'white' ? '\u2655' : '\u265B');
    }

    getLegalMoves(boardState, currentPos) {
        const legalMoves = [];
        const [row, col] = currentPos;
        // Directions: horizontal, vertical, and diagonal
        const directions = [
            { dr: -1, dc: 0 }, { dr: 1, dc: 0 }, // Vertical
            { dr: 0, dc: -1 }, { dr: 0, dc: 1 }, // Horizontal
            { dr: -1, dc: -1 }, { dr: -1, dc: 1 }, // Diagonal up
            { dr: 1, dc: -1 }, { dr: 1, dc: 1 }   // Diagonal down
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

export default Queen;
