import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import SignupForm from '../containers/SignupForm';

const Content = () => {
  return (
    <div className="loginContent">
      <div className="login">
        <SignupForm />
      </div>
    </div>
  )
}

export default Content;
