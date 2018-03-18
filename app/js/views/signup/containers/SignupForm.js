import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import { withRouter } from "react-router-dom";

import { signup, isUserExists } from '../../shared/actions/authActions';
import validateInput from '../../shared/utils/clientValidation';
import TextInputField from '../components/TextInputField';
import SubmitInputField from '../components/SubmitInputField';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
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
      },
      userAlreadyExists: false,
      isLoading: false,
      username: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
      passwordConfirmation: undefined,
    }
  }
  onChange = e => {
    this.setState({[e.target.name]: e.target.value}, () => {
      this.isValid();
    });
  }
  checkUserExists = e => {
    const fieldName = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let userAlreadyExists;
        if (res.data.isUserExists) {
          errors[fieldName].message = `User with such ${fieldName} already exists`;
          userAlreadyExists = true;
        } else {
          errors[fieldName].message = '';
          userAlreadyExists = false;
        }
        this.setState({ errors, userAlreadyExists });
      });
    }
  }
  onBlur = e => {
    if((this.state.errors.username.message === 'User with such username already exists' || this.state.errors.username.message === '')
        && (this.state.errors.email.message === 'User with such email already exists' ||  this.state.errors.email.message === '' )) {
      this.checkUserExists(e)
    }
  }
  isValid = () => {
    const { errors, isValid } = validateInput(this.state);
    this.setState({ errors });
    return isValid;
  }
  onSubmit = e => {
    e.preventDefault();
    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.signup(this.state)
                .then(() => {
                  this.props.history.push(`/`);
                })
                .catch(errors => {
                  console.log(errors);
                  this.setState({ errors, isLoading: false });
                });
    }
  }
  render() {
    const {errors, userAlreadyExists, isLoading} = this.state;
    return (
      <form autoComplete="off" onSubmit={this.onSubmit}>
        <TextInputField fieldName="username" placeholder="Username" onChange={this.onChange} onBlur={this.onBlur} errors={errors} required={true} FontAwesomeName="user"/>
        <TextInputField fieldName="firstName" placeholder="First Name" onChange={this.onChange} />
        <TextInputField fieldName="lastName" placeholder="Last Name" onChange={this.onChange} />
        <TextInputField fieldName="email" placeholder="Email" onChange={this.onChange} onBlur={this.onBlur} errors={errors} required={true} fontAwesomeName="at"/>
        <TextInputField fieldName="password" placeholder="Password" onChange={this.onChange} errors={errors} required={true} fontAwesomeName="lock" passwordField={true}/>
        <TextInputField fieldName="passwordConfirmation" placeholder="Confirm Password" onChange={this.onChange} errors={errors} required={true} fontAwesomeName="lock" passwordField={true}/>
        <SubmitInputField userAlreadyExists={userAlreadyExists} isLoading={isLoading}/>
        <div className='requiredDescription'>* required fields</div>
      </form>
    )
  }
}

export default connect(null, {signup, isUserExists})(withRouter(SignupForm));
