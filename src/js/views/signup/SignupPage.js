import React from 'react';
import { connect } from 'react-redux';

class SignupPage extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <div>
            <h1> SIGNUP </h1>
          </div>
        </div>
      </div>
     )
   }
 }

 const mapStateToProps = store => ({
     sampleState: store.sampleReducer,
     secondState: store.secondReducer
 });

 export default connect(mapStateToProps)(SignupPage);
