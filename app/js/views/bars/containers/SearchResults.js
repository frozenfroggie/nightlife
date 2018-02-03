import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
//actions
import { handleInputChange, search, deleteSearchData } from '../actions/searchActions';
import { toogleIsGrabbed, changeScrollButtonPosition, changeBarsPosition,
         setBarsHeight, setScrollbarPositionY } from '../actions/scrollActions';
import { setActiveBar } from '../actions/barActions';
//icons
import coctailIcon from '../../../../images/coctail.png';

import { withRouter } from "react-router-dom";

const horizontalLineHeight = 1;
const borderWidthOfActiveBar = 1;

class SearchResults extends React.Component {
  componentDidMount() {
    this.props.setBarsHeight(this.refs.bars.getBoundingClientRect().height);
    this.props.setScrollbarPositionY(this.refs.scrollbar.getBoundingClientRect().top);
  }
  componentWillUnmount() {
    this.props.deleteSearchData();
  }
  scroll = event => {
    const isMouseEvent = event.type === "mousemove" ? true : false;
    const hiddenContentHeight = this.props.scrollState.barsHeight - this.props.scrollState.barsContainerHeight;
    const halfOfScrollBtnHeight = this.props.scrollState.scrollButton.height / 2;
    const scrollbarPositionY = this.props.scrollState.scrollbar.positionY;
    const scrollBtnPositionY = this.props.scrollState.scrollButton.positionY;
    const nextScrollBtnPosition = isMouseEvent ? event.pageY - scrollbarPositionY - halfOfScrollBtnHeight:
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
  activateBar = (barIdx) => {
    this.props.setActiveBar(barIdx);
  }
  render() {
    const { searchData } = this.props.searchState;
    const bars = Array.isArray(searchData) && searchData.map( (bar, idx) => {
      let stars = [];
      for(let i = 0; i < Math.floor(bar.rating); i++) {
        stars.push(<span key={i}><FontAwesome name='star' /></span>);
      }
      bar.rating % 1 !== 0 && stars.push(<span key={stars.length}><FontAwesome name='star-half'/></span>);
      return (
        <div ref="bar" key={bar.name} onClick={() => this.activateBar(idx)} onMouseOver={() => this.activateBar(idx)} >
          <div className={this.props.activityState.activeBar === idx ? "bar barActive" : "bar barInactive"} style={this.props.scrollState.barStyle} >
            <img className="barImage" src={bar.image_url || coctailIcon} />
            <div className="barInfo">
              <div><h3> {bar.name} </h3></div>
              <div className="stars"> { stars } </div>
              <div>
                <span> { bar.price ? bar.price : '' } </span>
                <span style={ bar.price ? {padding: "0px 5px"} : {display: 'none'} }> | </span>
                <span> { bar.categories[0] ? bar.categories[0].title : '' }
                       { bar.categories[1] ? ',' + bar.categories[1].title : '' }
                </span>
              </div>
              <div> { bar.location.display_address.join(", ") } </div>
              <div> Phone: { bar.phone ? bar.phone : 'not specified' } </div>
            </div>
          </div>
          {
            idx !== searchData.length - 1 ?
            <hr style={{height: horizontalLineHeight}} />
            : ''
          }
        </div>
      )
    });
    return (
      <div className="searchedDataContainer">
        <div className="barsWrapper">
          <div className="barsContainer" style={{height: this.props.scrollState.barsContainerHeight}} onWheel={this.scroll}>
            <div className="bars" id="bars"
                 style={{top: this.props.scrollState.barsPosition, height: this.props.scrollState.height}}
                 ref="bars" >
              { bars }
            </div>
            <div className="scroll"
                 style={{height: this.props.scrollState.scrollbar.height + this.props.scrollState.scrollButton.height}}
                 ref="scrollbar" >
              <div className="scrollBtn"
                   style={{top: this.props.scrollState.scrollButton.positionY - 2, //coz we dont want to see scrollbar border above btn
                           height: this.props.scrollState.scrollButton.height}}
                   onMouseDown={() => this.props.toogleIsGrabbed(true)} >
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

 const mapStateToProps = store => ({
     searchState: store.searchReducer,
     scrollState: store.scrollReducer,
     activityState: store.activityReducer
 });

 export default connect(mapStateToProps, {setScrollbarPositionY, setActiveBar, handleInputChange, search, toogleIsGrabbed, changeScrollButtonPosition, changeBarsPosition, setBarsHeight, deleteSearchData})(SearchResults);
