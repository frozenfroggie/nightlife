import React from 'react';
import { Link } from 'react-router-dom';

const Content = (props) => {
  return (
    <div className="content">
      <div className="titleContainer">
        <h1 className="titleText">{ props.titleText }</h1>
      </div>
      <div className="btn">
        <Link className="link" to="/bars"> Go inside </Link>
      </div>
    </div>
  )
}

export default Content;
