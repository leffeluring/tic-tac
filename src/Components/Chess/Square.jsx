import React from 'react';

function Square({ piece, color, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: color === 'black' ? 'grey' : 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: color === 'black' ? 'white' : 'black',
      }}
    >
      {piece}
    </div>
  );
}

export default Square;
