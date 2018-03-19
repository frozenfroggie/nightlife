import React from 'react';
import { connect } from 'react-redux';
//actions
import { handleInputChange, search } from './actions/searchActions';
import { toogleIsGrabbed, changeScrollButtonPosition, changeBarsPosition,
         setScrollbarPositionY } from '../shared/actions/scrollActions';//components
import SearchInput from './containers/SearchInput';
import Bars from './containers/Bars';
import TheBackground from '../shared/components/TheBackground';

import { BrowserRouter as Router, Route, withRouter, Switch } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class BarsPage extends React.Component {
  scroll = (event) => {
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
    return (
        <div onMouseMove={this.scroll} onMouseUp={() => this.props.toogleIsGrabbed(false)} >
            <TheBackground backgroundName='bgBars' />
            <ReactCSSTransitionGroup transitionName="search" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
              <Switch key={this.props.history.location.pathname} pathname={this.props.history.location.pathname} location={this.props.history.location}>
                <Route exact path={this.props.match.url} key="searchPanel" render={() =>
                  ( <SearchInput searchData={this.props.searchState.searchData} /> )}
                />
                <Route path={`${this.props.match.url}/:city`}
                       key="bars"
                       component={Bars} />
              </Switch>
            </ReactCSSTransitionGroup>
        </div>
     )
   }
 }

 const mapStateToProps = store => ({
     searchState: store.searchReducer,
     scrollState: store.scrollReducer
 });

 export default withRouter(connect(mapStateToProps, {handleInputChange, search, toogleIsGrabbed, changeScrollButtonPosition, changeBarsPosition})(BarsPage));
