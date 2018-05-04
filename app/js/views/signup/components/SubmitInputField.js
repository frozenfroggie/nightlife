import React from 'react';

const SubmitInputField = props => {
  return(
    <div className="inputContainer">
      <input disabled={props.isLoading || props.userAlreadyExists} className="loginBtn" type="submit" value={props.isLoading ? "Sending..." : "Sign up"}/>
    </div>
  )
}

export default SubmitInputField;
