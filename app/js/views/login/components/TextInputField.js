import React from 'react';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

const TextInputField = props => {
  return(
    <div>
      <div className={classNames("inputContainer", {"required": props.required})}>
       <input className={classNames("input", {"inputError": props.errors && props.errors[props.fieldName] && props.errors[props.fieldName].message})}
              type={props.passwordField ? 'password' : 'text'}
              onChange={props.onChange}
              onBlur={props.onBlur}
              name={props.fieldName}
              placeholder={props.placeholder}/>
              {props.fontAwesomeName && <FontAwesome className="font" name={props.fontAwesomeName} />}
     </div>
     {props.errors && props.errors[props.fieldName] && <div className="errorMessage">{props.errors[props.fieldName].message}</div>}
    </div>
  );
}

export default TextInputField;
