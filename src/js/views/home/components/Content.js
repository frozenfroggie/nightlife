import React from 'react';
import { Link } from 'react-router-dom';

const Content = () => {
  return (
    <div className="content">
      <div>
        <h1 className="titleText"> Want experience unforgottable moments? Get step inside! </h1>
      </div>
      <div className="btn">
        <Link className="link" to="/bars"> Go inside </Link>
      </div>
    </div>
  )
}

export default Content;
