import Validator from 'validator';

const validateInput = data => {
  let errors = {
    credentials: {
      message: ''
    },
    password: {
      message: ''
    }
  };
  const credentials = data.credentials;
  const password = data.password;

  //validate credentials
  if (typeof credentials !== 'undefined' && Validator.isEmpty(credentials)) {
    errors.credentials.message = 'This field is required';
  }
  //validate password
  if (typeof password !== 'undefined' && Validator.isEmpty(password)) {
    errors.password.message = 'This field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).every(key => errors[key].message === '')
  }
}

export default validateInput;
