import React from 'react';
import FontAwesome from 'react-fontawesome';

const SocialLoginButton = props => {
  return(
    <div className="inputContainer">
      <div className="loginBtn"><FontAwesome name={props.name} /> &nbsp; {props.name === 'google-plus' ? 'google+' : props.name}</div>
    </div>
  )
}

export default SocialLoginButton;
