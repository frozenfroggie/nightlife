import React from 'react';
import FontAwesome from 'react-fontawesome';
import { handleBarsInputChange, search, deleteSearchData, saveFilteredSearchData, filterSearchData } from '../actions/searchActions';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import trim from 'lodash/trim';

class BarsSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }
  componentWillReceiveProps(nextProps) {
    const nextBarsInputValue = nextProps.searchState.barsInputValue;
    if(nextBarsInputValue !== this.props.searchState.barsInputValue) {
      let searchData = nextProps.searchState.searchData;
      searchData = searchData.filter( bar => bar.name.match(trim(nextBarsInputValue)) );
      this.props.saveFilteredSearchData(searchData);
    }
  }
  expandSearchbar() {
    if(!this.state.expanded) {
      this.refs.searchButton.style.transform = 'rotate(360deg)';
      this.refs.hiddenSearchbarContainer.style.width = '450px';
      this.refs.hiddenSearchbar.style.width = '350px';
      this.setState({expanded: true});
    } else if(this.props.searchState.barsInputValue === '') {
      this.refs.searchButton.style.transform = 'rotate(-360deg)';
      this.refs.hiddenSearchbarContainer.style.width = 'auto';
      this.refs.hiddenSearchbar.style.width = '0px';
      this.setState({expanded: false});
    }
  }
  filterSearchData = event => {
    if(event.target.value.length < 12) {
      this.props.handleBarsInputChange(event);
    }
  }
  render() {
    return (
      <div className="searchButtons">
        <div className="specialButton" onClick={() => this.props.history.push('/bars')}>
          <FontAwesome name='chevron-left'/>
        </div>
        <div className="hiddenSearchbarContainer" ref="hiddenSearchbarContainer" onMouseOver={() => this.expandSearchbar()} onMouseOut={() => this.expandSearchbar()}>
          <div className="hiddenSearchbar" ref="hiddenSearchbar">
            <input autoFocus className="searchInput" placeholder="Bar i.e. Spiz" type="text" value={this.props.searchState.barsInputValue} onChange={this.filterSearchData} />
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

 export default withRouter(connect(mapStateToProps, {filterSearchData, saveFilteredSearchData, handleBarsInputChange, search, deleteSearchData})(BarsSearchInput));
