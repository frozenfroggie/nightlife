import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import { withRouter, Link } from "react-router-dom";

import { login } from '../../shared/actions/authActions';
import validateInput from '../utils/clientValidation';
import TextInputField from '../components/TextInputField';
import SubmitInputField from '../components/SubmitInputField';
import SocialLoginButton from '../components/SocialLoginButton';
import LoginDescription from '../components/LoginDescription';
import Dividor from '../components/Dividor';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      isLoading: false,
      credentials: undefined,
      password: undefined,
    }
  }
  onChange = e => {
    this.setState({[e.target.name]: e.target.value}, () => {
      this.isValid();
    });
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
      this.props.login(this.state)
                .then(() => {
                  this.props.history.push(`/`);
                })
                .catch(errors => {
                  this.setState({ errors, isLoading: false });
                });
    }
  }
  render() {
    const {errors, userAlreadyExists, isLoading} = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextInputField fieldName="credentials" placeholder="Username or email" onChange={this.onChange} errors={errors} required={true} fontAwesomeName="user"/>
        <TextInputField fieldName="password" placeholder="Password" onChange={this.onChange} errors={errors} required={true} fontAwesomeName="lock" passwordField={true}/>
        <SubmitInputField isLoading={isLoading}/>
        <Dividor />
        <div className="socialBtns">
          <SocialLoginButton name="facebook"/>
          <SocialLoginButton name="github"/>
          <SocialLoginButton name="google-plus"/>
        </div>
        <br/>
        <LoginDescription />
      </form>
    )
  }
}

export default connect(null, {login})(withRouter(LoginForm));
