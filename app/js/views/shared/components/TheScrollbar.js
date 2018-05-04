import React from 'react';
import { connect } from 'react-redux';

import { toogleIsGrabbed, changeScrollButtonPosition, changeBarsPosition,
         setBarsHeight, setScrollbarPositionY, setScrollbarHeight } from '../actions/scrollActions';

class Scrollbar extends React.Component {
  componentDidMount() {
    this.props.setBarsHeight(this.props.barsRef.getBoundingClientRect().height);
    this.props.setScrollbarPositionY(this.refs.scrollbar.getBoundingClientRect().top);
    this.props.setScrollbarHeight(this.props.scrollbarHeight);
  }
  render() {
    return (
      <div className="scroll"
           style={{height: this.props.scrollbarHeight + this.props.scrollState.scrollButton.height}}
           ref="scrollbar" >
        <div className="scrollBtn"
             style={{top: this.props.scrollState.scrollButton.positionY - 2, //coz we dont want to see scrollbar border above btn
                     height: this.props.scrollState.scrollButton.height}}
             onMouseDown={() => this.props.toogleIsGrabbed(true)} >
        </div>
      </div>
    )
  }
}

 const mapStateToProps = store => ({
     scrollState: store.scrollReducer
 });

 export default connect(mapStateToProps, {setScrollbarHeight, toogleIsGrabbed, changeScrollButtonPosition, changeBarsPosition, setBarsHeight, setScrollbarPositionY})(Scrollbar);
