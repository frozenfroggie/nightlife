import React from 'react';
import { connect } from 'react-redux';
//actions
import { handleInputChange, search } from './actions/searchActions';
import { toogleIsGrabbed, changeScrollButtonPosition, changeBarsPosition } from './actions/scrollActions';
//components
import SearchPanel from './components/SearchPanel';

class BarsPage extends React.Component {
  scroll = event => {
    const isMouseEvent = event.type === "mousemove" ? true : false;
    const hiddenContentHeight = this.props.scrollState.barsHeight - this.props.scrollState.barsContainerHeight;
    const halfOfScrollBtnHeight = this.props.scrollState.scrollButton.height / 2;
    const scrollbarPositionY = this.props.scrollState.scrollbar.positionY
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
  render() {
    return (
        <div className="citylight" onMouseMove={this.scroll} onMouseUp={() => this.props.toogleIsGrabbed(false)} >
          <SearchPanel searchData={this.props.searchState.searchData} />
        </div>
     )
   }
 }

 const mapStateToProps = store => ({
     searchState: store.searchReducer,
     scrollState: store.scrollReducer
 });

 export default connect(mapStateToProps, {handleInputChange: handleInputChange, search: search, toogleIsGrabbed: toogleIsGrabbed, changeScrollButtonPosition: changeScrollButtonPosition, changeBarsPosition: changeBarsPosition})(BarsPage);
