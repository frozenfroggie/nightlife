import React from 'react';
//containers
import SearchButtons from '../containers/SearchButtons';
import SearchResults from '../containers/SearchResults';
import GoogleMap from '../containers/GoogleMap';
import FontAwesome from 'react-fontawesome';

const Bars = (props) => {
  return (
    <div className="wrapper">
      <div className="searchContainerComplex">
        <div className="searchResults">
          <SearchButtons />
          <SearchResults />
        </div>
        <div className="nextBarButtonContainer">
          <div className="specialButton">
            <FontAwesome name="chevron-down" />
          </div>
        </div>
        <GoogleMap />
      </div>
    </div>
  )
}

export default Bars;
