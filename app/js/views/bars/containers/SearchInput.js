import React from 'react';
import FontAwesome from 'react-fontawesome';
import { handleInputChange, search } from '../actions/searchActions';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router'
import classNames from 'classnames';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldFloat: false
    }
  }
  componentDidUpdate() {
    this.props.searchState.searchData.length > 0 && this.props.history.push(`${this.props.match.url}/${this.props.searchState.inputValue}`);
  }
  toogleFloat = () => {
    this.props.searchState.inputValue === '' && this.setState({shouldFloat: !this.state.shouldFloat});
  }
  render() {
    const searchIfEnter = event => event.key === "Enter" ? this.props.search(this.props.searchState.inputValue) : '';
    return (
      <div className="wrapper">
        <div className="content">
          <div className="searchContainerSimple" key="1">
            <div className="search">
              <div className="hint"> Please enter your city </div>
              <label className={classNames('searchLabel', {'floatSearchLabel': this.state.shouldFloat})} htmlFor="search" > City i.e. New York </label>
              <input autoFocus={window.innerWidth < 1024} onBlur={this.toogleFloat} onFocus={this.toogleFloat} id="search" className="searchInput" type="text" value={this.props.searchState.inputValue} onChange={this.props.handleInputChange} onKeyDown={searchIfEnter}/>
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
