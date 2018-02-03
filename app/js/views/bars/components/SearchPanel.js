import React from 'react';
//components
import Bars from './Bars';
//containers
import SearchInput from '../containers/SearchInput';
import SearchButtons from '../containers/SearchButtons';
import SearchResults from '../containers/SearchResults';
import GoogleMap from '../containers/GoogleMap';
import FontAwesome from 'react-fontawesome';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const SearchPanel = (props) => {
  return (
    <div className="wrapper">
      <div className="content">
        <div className="searchContainerSimple" key="1">
          <SearchInput />
        </div>
      </div>
    </div>
  )
}

export default SearchPanel;

/*
<div className="wrapper">
  <ReactCSSTransitionGroup className="content" transitionName="search" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
    {
      props.searchData.length === 0 ?
        <div className="searchContainerSimple" key="1">
          <SearchInput />
        </div>
      :
      <Bars key="2"/>
    }
  </ReactCSSTransitionGroup>
</div>
*/
