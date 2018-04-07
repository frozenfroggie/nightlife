import React from 'react';
import FontAwesome from 'react-fontawesome';
import { forceCityInputChange, handleCityInputChange, search } from '../actions/searchActions';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router'
import classNames from 'classnames';
import axios from 'axios';

class CitySearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      location: {
        lat: undefined,
        lng: undefined,
        citySearchShow: false
      }
    }
  }
  componentDidMount() {
    this.setState({citySearchShow: true});
    if(this.props.searchState.cityInputValue !== '') {
      this.props.forceCityInputChange('');
    }
  }
  handleFocus = () => {
    this.setState({isFocused: true});
  }
  handleBlur = () => {
    this.setState({isFocused: false});
  }
  componentDidUpdate() {
    if(this.props.searchState.searchData.length > 0) {
      this.props.history.push(`${this.props.match.url}/${this.props.searchState.cityInputValue}`);
    }
  }
  componentWillUnmount() {
    this.setState({citySearchShow: false});
  }
  getLocation = () => {
    if(navigator.geolocation) {
      const geo_options = {
        enableHighAccuracy: true,
        maximumAge        : 30000,
        timeout           : 27000
      };
      navigator.geolocation.getCurrentPosition( position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.setState({location: pos});
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyDJWknmaOWpg2xv4tD0tdRGTJ4xG067iHY`)
            .then(res => {
              this.props.forceCityInputChange(res.data.results[1].formatted_address);
              this.startSearching({lat: pos.lat, lng: pos.lng});
            }).catch(err => {
              console.log(err);
            });
      }, (err) => {
        console.log(err)
      }, geo_options);
    }
  }
  onChange = event => {
    this.props.handleCityInputChange(event);
  }
  startSearching = (coordinates) => {
    if(coordinates) {
      this.props.search(false, coordinates);
    }
    let cityInputValue = this.props.searchState.cityInputValue;
    this.props.search(cityInputValue);
  }
  render() {
    const searchIfEnter = event => event.key === "Enter" ? this.startSearching() : '';
    const { searchState, history } = this.props;
    return (
      <div className="wrapper">
        <div className="content">
          <div className={classNames(["searchContainerSimple", {"citySearchShow": this.state.citySearchShow}])} key="1">
            <div className="search">
              <div className="hint"> Please enter your city </div>
              <label className={classNames('searchLabel', {'searchError': searchState.searchError}, {'floatSearchLabel': searchState.cityInputValue !== '' || this.state.isFocused})} htmlFor="search" >
                { searchState.searchError ? 'Sorry, no results found' : 'City i.e. New York' }
              </label>
              <div className='inputContainer'>
                <input autoFocus={window.innerWidth < 1024} onBlur={this.handleBlur} onFocus={this.handleFocus} id="search" className="searchInput" type="text" value={this.props.searchState.cityInputValue} onChange={this.onChange} onKeyDown={searchIfEnter}/>
                <div className='location' onClick={this.getLocation}>
                  <FontAwesome name='map-marker'/>
                </div>
              </div>
              <div className="backContainer">
                <div className="specialButton" onClick={() => history.push('/')}>
                  <FontAwesome name='chevron-left'/>
                </div>
              </div>
              <div className="magnifierContainer">
                <div className="specialButton" onClick={this.startSearching}>
                {
                  searchState.isSearching ?
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

 export default connect(mapStateToProps, {forceCityInputChange, handleCityInputChange, search})(withRouter(CitySearchInput));
