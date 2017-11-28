import React from 'react';
import { connect } from 'react-redux';
import { sampleAsyncAction } from '../actions/sampleAsyncActions';

class Home extends React.Component {
  render() {
    return (
     <div className="App">
     </div>
     )
   }
 }

 const mapStateToProps = store => ({
     sampleState: store.sampleReducer,
     secondState: store.secondReducer
 });

 export default connect(mapStateToProps,{onButtonClick: sampleAsyncAction})(Home);
