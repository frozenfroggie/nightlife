import React from 'react';
import FontAwesome from 'react-fontawesome';

const SocialLoginButton = props => {
  return(
    <div className="inputContainer">
      <div className="loginBtn"><FontAwesome name={props.name} /> &nbsp; Facebook</div>
    </div>
  )
}

export default SocialLoginButton;
