import React from 'react';

const SubmitInputField = props => {
  return(
    <div className="inputContainer">
      <input disabled={props.isLoading || props.userAlreadyExists} className="loginBtn" type="submit" value={props.isLoading ? "Sending verification email.." : "Sign up"}/>
    </div>
  )
}

export default SubmitInputField;
