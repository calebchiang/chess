import React from 'react';
import '../styles/Square.css';

const Square = ({ colour, onClick, children, highlighted }) => {
    return (
        <div
            className={`square ${colour === 'dark' ? 'darkSquare' : 'lightSquare'} ${highlighted ? 'highlight' : ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Square;
