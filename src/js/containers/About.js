import React from 'react';
import { connect } from 'react-redux';
import { sampleAsyncAction } from '../actions/sampleAsyncActions';

class About extends React.Component {
  render() {
    return (
     <div className="App">
       <div className="App-header">
         <h2> About </h2>
       </div>
       <div className="App-body">
         <button onClick={this.props.onButtonClick}>Async Action</button>
         <div dangerouslySetInnerHTML={{__html: this.props.sampleState.sampleInput }}></div>
       </div>
     </div>
     )
   }
 }

 const mapStateToProps = store => ({
     sampleState: store.sampleReducer,
     secondState: store.secondReducer
 });

 export default connect(mapStateToProps,{onButtonClick: sampleAsyncAction})(About);
