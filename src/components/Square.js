import React from 'react';
import '../styles/Square.css';

const Square = ({ colour, onClick, children }) => {
    return (
        <div
            className={`square ${colour === 'dark' ? 'darkSquare' : 'lightSquare'}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Square;
