import React from 'react';

const TheBackground = props => {
  return (
    <div className="wrapper">
      <div className={props.backgroundName}></div>
    </div>
  )
}

export default TheBackground;
