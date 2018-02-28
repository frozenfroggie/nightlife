import Validator from 'validator';

const validateInput = data => {
  let errors = {
    username: {
      message: ''
    },
    email: {
      message: ''
    },
    password: {
      message: ''
    },
    passwordConfirmation: {
      message: ''
    }
  };
  const username = data.username;
  const email = data.email;
  const password = data.password;
  const passwordConfirmation = data.passwordConfirmation;
  //validate username
  if (typeof username !== 'undefined' && Validator.isEmpty(username)) {
    errors.username.message = 'This field is required';
  }
  //validate email
  if (typeof email !== 'undefined' && Validator.isEmpty(email)) {
    errors.email.message = 'This field is required';
  }
  if (typeof email !== 'undefined' && !Validator.isEmail(email)) {
    errors.email.message = 'Email is invalid';
  }
  //validate password
  if (typeof password !== 'undefined' && Validator.isEmpty(password)) {
    errors.password.message = 'This field is required';
  }
  if (typeof passwordConfirmation !== 'undefined' && Validator.isEmpty(passwordConfirmation)) {
    errors.passwordConfirmation.message = 'This field is required';
  }
  if (typeof password !== 'undefined' && typeof passwordConfirmation !== 'undefined' && !Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation.message = 'Passwords must match';
  }

  return {
    errors,
    isValid: Object.keys(errors).every(key => errors[key].message === '')
  }
}

export default validateInput;
