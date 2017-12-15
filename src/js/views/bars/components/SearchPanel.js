import React from 'react';
//components
import SearchTitle from './SearchTitle';
//containers
import SearchInput from '../containers/SearchInput';
import SearchResults from '../containers/SearchResults';
import GoogleMap from '../containers/GoogleMap';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const SearchPanel = (props) => {
  return (
    <div  className="wrapper">
      <ReactCSSTransitionGroup className="content" transitionName="search" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
        {
          props.searchData.length === 0 ?
            <div className="searchContainerSimple" key="1">
              <SearchTitle />
              <SearchInput />
            </div>
          :
          <div className="wrapper" key="2">
            <div className="searchContainerComplex">
              <div className="searchResults">
                <SearchInput />
                <SearchResults />
              </div>
                <GoogleMap />
            </div>
          </div>
        }
      </ReactCSSTransitionGroup>
    </div>
  )
}

export default SearchPanel;
