import React from 'react';
import FontAwesome from 'react-fontawesome';
import { handleCityInputChange, search } from '../actions/searchActions';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router'
import classNames from 'classnames';

class CitySearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false
    }
  }
  handleFocus = () => {
    this.setState({isFocused: true});
  }
  handleBlur = () => {
    this.setState({isFocused: false});
  }
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
              <label className={classNames('searchLabel', {'floatSearchLabel': this.props.searchState.cityInputValue !== '' || this.state.isFocused})} htmlFor="search" > City i.e. New York </label>
              <input autoFocus={window.innerWidth < 1024} onBlur={this.handleBlur} onFocus={this.handleFocus} id="search" className="searchInput" type="text" value={this.props.searchState.cityInputValue} onChange={this.props.handleCityInputChange} onKeyDown={searchIfEnter}/>
              <div className="backContainer">
                <div className="specialButton" onClick={() => this.props.history.push('/')}>
                  <FontAwesome name='chevron-left'/>
                </div>
              </div>
              <div className="magnifierContainer">
                <div className="specialButton" onClick={() => this.props.search(this.props.searchState.cityInputValue)}>
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

 export default connect(mapStateToProps, {handleCityInputChange, search})(withRouter(CitySearchInput));
