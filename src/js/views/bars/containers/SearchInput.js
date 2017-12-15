import React from 'react';
import FontAwesome from 'react-fontawesome';
import { handleInputChange, search } from '../actions/searchActions';
import { connect } from 'react-redux';
import { toogleIsGrabbed, changeScrollButtonPosition, changeBarsPosition } from '../actions/scrollActions';

class SearchInput extends React.Component {
  render() {
    const searchIfEnter = event => event.key === "Enter" ? this.props.search(this.props.searchState.inputValue) : '';
    return (
      <div className="search">
        <input className="searchInput" placeholder="City i.e. New York" type="text" value={this.props.searchState.inputValue} onChange={this.props.handleInputChange} onKeyDown={searchIfEnter}/>
        <div className="magnifier" onClick={() => this.props.search(this.props.searchState.inputValue)}>
          <FontAwesome name='search' />
        </div>
      </div>
    )
  }
}

 const mapStateToProps = store => ({
     searchState: store.searchReducer,
     scrollState: store.scrollReducer
 });

 export default connect(mapStateToProps, {handleInputChange: handleInputChange, search: search, toogleIsGrabbed: toogleIsGrabbed, changeScrollButtonPosition: changeScrollButtonPosition, changeBarsPosition: changeBarsPosition})(SearchInput);
