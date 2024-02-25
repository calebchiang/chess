class Piece {
    constructor(color, icon) {
        this.color = color;
        this.icon = icon;
    }

    getIcon() {
        return this.icon;
    }

    getLegalMoves(){
        console.log("Override this method");
    }

    move() {
        console.log("Override this method");
    }

}

export default Piece;
