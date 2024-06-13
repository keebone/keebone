import React from 'react';

const Square = ({ x, y, size, color, onRemove }) => {
  return (
    <rect
      x={x}
      y={y}
      width={size}
      height={size}
      fill={color}
      onClick={onRemove}
    />
  );
};

export default Square;
