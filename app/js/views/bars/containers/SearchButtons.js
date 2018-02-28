import React from 'react';
import FontAwesome from 'react-fontawesome';
import { handleInputChange, search, deleteSearchData } from '../actions/searchActions';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class SearchInput extends React.Component {
  expanded = false;
  expandSearchbar() {
    if(!this.expanded) {
      this.refs.searchButton.style.transform = 'rotate(360deg)';
      this.refs.hiddenSearchbarContainer.style.width = '450px';
      this.refs.hiddenSearchbar.style.width = '350px';
      this.expanded = !this.expanded;
    } else {
      this.refs.searchButton.style.transform = 'rotate(-360deg)';
      this.refs.hiddenSearchbarContainer.style.width = 'auto';
      this.refs.hiddenSearchbar.style.width = '0px';
      this.expanded = !this.expanded;
    }
  }
  handleInputChange = () => {
    this.props.handleInputChange(this.props.searchState.inputValue);
    this.props.search(this.props.searchState.inputValue);
  }
  render() {
    return (
      <div className="searchButtons">
        <div className="specialButton" onClick={() => this.props.history.push('/bars')}>
          <FontAwesome name='chevron-left'/>
        </div>
        <div className="hiddenSearchbarContainer" ref="hiddenSearchbarContainer" onMouseOver={() => this.expandSearchbar()} onMouseOut={() => this.expandSearchbar()}>
          <div className="hiddenSearchbar" ref="hiddenSearchbar">
            <input autoFocus className="searchInput" placeholder="Bar i.e. Spiz" type="text" value={this.props.searchState.inputValue} onChange={this.handleInputChange} />
          </div>
          <div className="specialButton" ref="searchButton" >
            <FontAwesome name='search' />
          </div>
        </div>
      </div>
    )
  }
}

 const mapStateToProps = store => ({
     searchState: store.searchReducer,
     scrollState: store.scrollReducer
 });

 export default withRouter(connect(mapStateToProps, {handleInputChange, search, deleteSearchData})(SearchInput));
