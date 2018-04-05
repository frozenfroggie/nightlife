import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { withRouter } from "react-router-dom";
import classnames from 'classnames';

import { resetScrollSettings, toogleIsGrabbed, changeScrollButtonPosition, changeBarsPosition,
         setScrollbarPositionY, setBarsContainerHeight } from '../../shared/actions/scrollActions';
import { handleInputChange, search, deleteSearchData } from '../actions/searchActions';
import { setActiveBar, wantToGo, removeBarFromUser } from '../actions/barActions';

import TheScrollbar from '../../shared/components/TheScrollbar';

import coctailIcon from '../../../../assets/coctail.png';

const horizontalLineHeight = 1;
const borderWidthOfActiveBar = 1;

class BarsSearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      barsEl: null,
      barsContainerShow: false
    }
  }
  componentDidMount() {
    this.props.setBarsContainerHeight(467);
    this.props.resetScrollSettings();
    this.setState({barsContainerShow: true});
  }
  componentWillUnmount() {
    this.setState({barsContainerShow: false});
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
    const barUrl =  this.props.searchState.filteredSearchData[barIdx].url;
    window.open(barUrl, '_blank');
  }
  onHover = (barIdx) => {
    this.props.setActiveBar(barIdx);
  }
  isLoved = (barId) => {
    let isLoved = false;
    if(this.props.authState.user.bars) {
      this.props.authState.user.bars.forEach( (likedBar, idx) => {
        likedBar.id === barId ? isLoved = true : '';
      });
    }
    return isLoved;
  }
  render() {
    const { filteredSearchData } = this.props.searchState;
    const noResults = (<div className='noResultsContainer'><div><h3>No results for {this.props.searchState.barsInputValue}</h3></div></div>);
    const bars = Array.isArray(filteredSearchData) && filteredSearchData.map( (bar, idx) => {
      let stars = [];
      for(let i = 0; i < Math.floor(bar.rating); i++) {
        stars.push(<span key={i}><FontAwesome name='star' /></span>);
      }
      bar.rating % 1 !== 0 && stars.push(<span key={stars.length}><FontAwesome name='star-half'/></span>);
      const favoriteBar = {id: bar.id, name: bar.name, imgUrl: bar.image_url, address: bar.location.display_address.join(", "), phone: bar.phone, url: bar.url };
      return (
        <div ref="bar" key={bar.name} onMouseOver={() => this.onHover(idx)} >
          <div className={this.props.activityState.activeBar === idx ? "bar barActive" : "bar barInactive"} style={this.props.scrollState.barStyle} >
            <img className="barImage" src={bar.image_url || coctailIcon} />
            <div className="barInfo">
              <div className="barName">
                <h3 onClick={() => this.onClick(idx)}> {bar.name} </h3>
              </div>
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
            <div>
            {
              this.props.authState.isAuthenticated ?
                this.isLoved(bar.id) ?
                  <div key={idx} className="wantToGo loved" onClick={() => this.props.removeBarFromUser(favoriteBar.id).catch(err => console.log(err))}>
                    <div className='heart heartLoved'><FontAwesome name="heart" /></div>
                    Loved
                  </div>
                  :
                  <div key={idx} className="wantToGo" onClick={() => this.props.wantToGo(favoriteBar).catch(err => console.log(err))}>
                    <div className='heart'><FontAwesome name="heart" /></div>
                  </div>
                : ''
            }
            </div>
          </div>
          {
            idx !== filteredSearchData.length - 1 ?
            <hr style={{height: horizontalLineHeight}} />
            : ''
          }
        </div>
      )
    });
    return (
      <div className="searchedDataContainer">
        <div className="barsWrapper">
          <div className={classnames(['barsContainer', {'barsContainerShow': this.state.barsContainerShow}])} style={{height: this.props.scrollState.barsContainerHeight}}
                                         onWheel={this.scroll}>
            <div className="bars" id="bars"
                 style={{top: this.props.scrollState.barsPosition}}
                 ref={ barsRef => !this.state.barsEl && this.setState({ barsEl: barsRef }) } >
              { this.props.searchState.filteredSearchData.length !== 0 ? bars : noResults }
            </div>
            {
              this.state.barsEl ?
              <TheScrollbar barsRef={this.state.barsEl} scrollbarHeight={385} />
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
     activityState: store.activityReducer,
     authState: store.authReducer
 });

 export default connect(mapStateToProps, {removeBarFromUser, resetScrollSettings, setBarsContainerHeight, changeScrollButtonPosition, changeBarsPosition, wantToGo, setActiveBar, handleInputChange, search, deleteSearchData})(BarsSearchResults);
