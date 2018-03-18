import React from 'react';

import TheBackground from '../shared/components/TheBackground';
import Content from './components/Content';

const SignupPage = () => {
  return (
    <div className="wrapper">
      <TheBackground backgroundName='bgSignup'/>
      <Content />
    </div>
   )
 }

 export default SignupPage;
