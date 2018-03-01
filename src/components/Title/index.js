import React from 'react';

const title = ({text, style}) => {
  return (
    <h2 className="title" style={style}>
      {text}
    </h2>
  )
}

export default title;