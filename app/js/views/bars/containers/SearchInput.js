import React from 'react';
import FontAwesome from 'react-fontawesome';
import { handleInputChange, search } from '../actions/searchActions';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router'

class SearchInput extends React.Component {
  componentDidUpdate() {
    this.props.searchState.searchData.length > 0 && this.props.history.push(`${this.props.match.url}/${this.props.searchState.inputValue}`);
  }
  render() {
    const searchIfEnter = event => event.key === "Enter" ? this.props.search(this.props.searchState.inputValue) : '';
    return (
      <div className="wrapper">
        <div className="content">
          <div className="searchContainerSimple" key="1">
            <div className="search">
              <div className="hint"> Please enter your city </div>
              <input className="searchInput" autoFocus placeholder="City i.e. New York" type="text" value={this.props.searchState.inputValue} onChange={this.props.handleInputChange} onKeyDown={searchIfEnter}/>
              <div className="backContainer">
                <div className="specialButton" onClick={() => this.props.history.push('/')}>
                  <FontAwesome name='chevron-left'/>
                </div>
              </div>
              <div className="magnifierContainer">
                <div className="specialButton" onClick={() => this.props.search(this.props.searchState.inputValue)}>
                {
                  this.props.searchState.isSearching ?
                  <FontAwesome name='spinner' pulse />
                  :
                  <FontAwesome name='search' />
                }
                </div>
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
     scrollState: store.scrollReducer
 });

 export default connect(mapStateToProps, {handleInputChange, search})(withRouter(SearchInput));
