import React from 'react';

const SubmitInputField = props => {
  return(
    <div className="inputContainer">
      <input disabled={props.isLoading} className="loginBtn" type="submit" value={props.isLoading ? "Loading..." : "Log in"}/>
    </div>
  )
}

export default SubmitInputField;
