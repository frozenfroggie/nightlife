import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import LoginForm from '../containers/LoginForm';

const Content = () => {
  return (
    <div className="loginContent">
      <div className="login">
        <LoginForm />
      </div>
    </div>
  )
}

export default Content;
