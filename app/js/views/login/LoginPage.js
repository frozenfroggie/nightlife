import React from 'react';
import { connect } from 'react-redux';
//components
import Background from './components/Background';
import Content from './components/Content';

const LoginPage = () => {
  return (
    <div className="wrapper">
      <Background />
      <Content />
    </div>
   )
 }

export default LoginPage;
