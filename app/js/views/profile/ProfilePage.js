import React from 'react';
import {connect} from 'react-redux'
import { Switch, Redirect } from 'react-router-dom'
//components
import Background from './components/Background';
import Content from './components/Content';

import { resetScrollSettings, toogleIsGrabbed, changeScrollButtonPosition, changeBarsPosition, setBarsContainerHeight } from '../shared/scroll/scrollActions';

class ProfilePage extends React.Component {
  componentDidMount() {
     this.props.setBarsContainerHeight(230);
     this.props.resetScrollSettings();
  }
  scroll = event => {
    if(this.props.authState.user.bars.length <= 3) {
      return;
    }
    const isMouseEvent = event.type === "mousemove" ? true : false;
    const hiddenContentHeight = this.props.scrollState.barsHeight - this.props.scrollState.barsContainerHeight;
    const halfOfScrollBtnHeight = this.props.scrollState.scrollButton.height / 2;
    const scrollbarPositionY = this.props.scrollState.scrollbar.positionY;
    const scrollBtnPositionY = this.props.scrollState.scrollButton.positionY;
    const nextScrollBtnPosition = isMouseEvent ? event.pageY - scrollbarPositionY - halfOfScrollBtnHeight :
                                                 event.deltaY + scrollBtnPositionY - halfOfScrollBtnHeight;
    const scrolledFraction = nextScrollBtnPosition / this.props.scrollState.scrollbar.height;
    if((isMouseEvent && this.props.scrollState.isGrabbed) || !isMouseEvent) {
      if(nextScrollBtnPosition >= 0 && nextScrollBtnPosition <= this.props.scrollState.scrollbar.height) {
        this.props.changeScrollButtonPosition(nextScrollBtnPosition);
        this.props.changeBarsPosition(-(scrolledFraction * hiddenContentHeight));
      } else if(nextScrollBtnPosition < 0 ) {
        this.props.changeScrollButtonPosition(0);
        this.props.changeBarsPosition(0);
      } else if(nextScrollBtnPosition > this.props.scrollState.scrollbar.height) {
        this.props.changeScrollButtonPosition(this.props.scrollState.scrollbar.height);
        this.props.changeBarsPosition(-hiddenContentHeight);
      }
    }
  }
  render() {
    if (!this.props.authState.isAuthenticated) {
      return <Redirect to={'/'} />;
    }
    return (
      <div >
        <div className="wrapper">
          <Background />
          <Content user={this.props.authState.user} scroll={this.scroll} barsContainerHeight={this.props.scrollState.barsContainerHeight} barsPosition={this.props.scrollState.barsPosition} />
        </div>
      </div>
     )
  }
 }

 const mapStateToProps = store => ({
     authState: store.authReducer,
     scrollState: store.scrollReducer
 });

 export default connect(mapStateToProps, {resetScrollSettings, setBarsContainerHeight, changeScrollButtonPosition, changeBarsPosition})(ProfilePage);
