import React from 'react';
//containers
import BarsSearchButtons from '../containers/BarsSearchButtons';
import BarsSearchResults from '../containers/BarsSearchResults';
import TheGoogleMap from '../../shared/components/TheGoogleMap';
import FontAwesome from 'react-fontawesome';

const Bars = (props) => {
  return (
    <div className="wrapper">
      <div className="searchContainerComplex">
        <div className="searchResults">
          <BarsSearchButtons />
          <BarsSearchResults />
        </div>
        <div className="nextBarButtonContainer">
          <div className="specialButton">
            <FontAwesome name="chevron-down" />
          </div>
        </div>
        <TheGoogleMap />
      </div>
    </div>
  )
}

export default Bars;
