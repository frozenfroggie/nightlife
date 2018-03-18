import Validator from 'validator';

const validateInput = data => {
  let formData = Object.assign({}, data);
  let errors = formData.errors;
  const username = formData.username;
  const email = formData.email;
  const password = formData.password;
  const passwordConfirmation = formData.passwordConfirmation;
  //validate username
  if(errors.username.message !== "User with such username already exists") {
    errors.username.message = '';
    if (typeof username !== 'undefined' && Validator.isEmpty(username)) {
      errors.username.message = 'This field is required';
    } else if(typeof username !== 'undefined' && username.length < 4) {
      errors.username.message = 'Username must be at least 4 characters';
    }
  }
  //validate email
  if(errors.email.message !== "User with such email already exists") {
    errors.email.message = '';
    if (typeof email !== 'undefined' && Validator.isEmpty(email)) {
      errors.email.message = 'This field is required';
    } else if (typeof email !== 'undefined' && !Validator.isEmail(email)) {
      errors.email.message = 'Email is invalid';
    }
  }
  //validate password
  errors.password.message = '';
  if (typeof password !== 'undefined' && Validator.isEmpty(password)) {
    errors.password.message = 'This field is required';
  } else if (typeof passwordConfirmation !== 'undefined' && Validator.isEmpty(passwordConfirmation)) {
    errors.passwordConfirmation.message = 'This field is required';
  }

  errors.passwordConfirmation.message = '';
  if (typeof password !== 'undefined' && typeof passwordConfirmation !== 'undefined' && !Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation.message = 'Passwords must match';
  } else if(typeof password !== 'undefined' && password.length < 6) {
    errors.password.message = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).every(key => errors[key].message === '')
  }
}

export default validateInput;
