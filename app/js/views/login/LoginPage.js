import React from 'react';
import { connect } from 'react-redux';
//components
import Content from './components/Content';
import TheBackground from '../shared/components/TheBackground';

const LoginPage = () => {
  return (
    <div className="wrapper">
      <TheBackground backgroundName='bgLogin'/>
      <Content />
    </div>
   )
 }

export default LoginPage;
