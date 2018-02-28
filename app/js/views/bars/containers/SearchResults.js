import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { withRouter } from "react-router-dom";

import { resetScrollSettings, toogleIsGrabbed, changeScrollButtonPosition, changeBarsPosition,
         setScrollbarPositionY, setBarsContainerHeight } from '../../shared/scroll/scrollActions';
import { handleInputChange, search, deleteSearchData } from '../actions/searchActions';
import { setActiveBar, wantToGo } from '../actions/barActions';

import Scrollbar from '../../shared/scroll/Scrollbar';

import coctailIcon from '../../../../images/coctail.png';

const horizontalLineHeight = 1;
const borderWidthOfActiveBar = 1;

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      barsEl: null
    }
  }
  componentDidMount() {
    this.props.setBarsContainerHeight(467);
    this.props.resetScrollSettings();
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
  onClick = (barIdx) => {
    this.props.setActiveBar(barIdx);
    //const barUrl =  this.props.searchState.searchData[barIdx].url;
    //window.open(barUrl, '_blank');
  }
  onHover = (barIdx) => {
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
        <div ref="bar" key={bar.name} onClick={() => this.onClick(idx)} onMouseOver={() => this.onHover(idx)} >
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
            <div className="wantToGo" onClick={() => this.props.wantToGo({name: bar.name, imgUrl: bar.image_url, address: bar.location.display_address.join(", "), phone: bar.phone, url: bar.url })}><FontAwesome name="heart" /></div>
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
                 style={{top: this.props.scrollState.barsPosition}}
                 ref={ barsRef => !this.state.barsEl && this.setState({ barsEl: barsRef }) } >
              { bars }
            </div>
            {
              this.state.barsEl ?
              <Scrollbar barsRef={this.state.barsEl} scrollbarHeight={385} />
              : ''
            }
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

 export default connect(mapStateToProps, {resetScrollSettings, setBarsContainerHeight, changeScrollButtonPosition, changeBarsPosition, wantToGo, setActiveBar, handleInputChange, search, deleteSearchData})(SearchResults);
