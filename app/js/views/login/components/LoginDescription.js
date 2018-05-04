import React from 'react';
import {Link} from "react-router-dom";

const LoginDescription = () => {
  return (
    <div className="description">
      <div> {"Don't have an account? "} </div>
      <Link to="/signup"> &nbsp; Sign up </Link>
    </div>
  )
}

export default LoginDescription;
