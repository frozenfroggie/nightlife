import React from 'react';
import {connect} from 'react-redux'
import { Switch, Redirect } from 'react-router-dom'
//components
import Background from './components/Background';
import Content from './components/Content';
import TheBackground from '../shared/components/TheBackground';
//actions
import { resetScrollSettings, toogleIsGrabbed, changeScrollButtonPosition,
         changeBarsPosition, setBarsContainerHeight } from '../shared/actions/scrollActions';
import { disconnect } from '../shared/actions/authActions';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false
    }
  }
  componentDidMount() {
     this.props.setBarsContainerHeight(240);
     this.props.resetScrollSettings();
  }
  scroll = event => {
    if(this.props.authState.user.bars.length <= 3) {
      return;
    }
    const isMouseEvent = event.type === "mousemove" ? true : false;
    const hiddenContentHeight = this.props.scrollState.barsHeight - this.props.scrollState.barsContainerHeight + 10;
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
  handleClick = (bool) => {
    this.setState({showSettings: bool});
  }
  render() {
    return (
      <div onMouseMove={this.scroll} onMouseUp={() => this.props.toogleIsGrabbed(false)}>
        <div className="wrapper">
        <TheBackground backgroundName='bgProfile'/>
          <Content disconnect={(socialName) => this.props.disconnect(socialName)}
                   handleClick={(bool) => this.handleClick(bool)}
                   showSettings={this.state.showSettings}
                   user={this.props.authState.user}
                   scroll={this.scroll} />
        </div>
      </div>
     )
  }
 }

 const mapStateToProps = store => ({
     authState: store.authReducer,
     scrollState: store.scrollReducer
 });

 export default connect(mapStateToProps, { disconnect, resetScrollSettings, setBarsContainerHeight, changeScrollButtonPosition, changeBarsPosition, toogleIsGrabbed})(ProfilePage);
