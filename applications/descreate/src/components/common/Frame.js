import React from 'react';

const Frame = ({ children, style, className }) => {
  return (
    <div className={`frame ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Frame;
