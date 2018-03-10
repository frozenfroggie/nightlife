import React from 'react';
import {connect} from 'react-redux'
import trim from 'lodash/trim';
import FontAwesome from 'react-fontawesome';

import TheScrollbar from '../../shared/components/TheScrollbar';
import {removeBarFromUser} from '../../bars/actions/barActions.js';

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      barsEl: null,
      barLocationToExpand: undefined
    }
  }
  beautyLocation(location) {
    try {
      let beauty = location.split('');
      if(beauty.length > 31) {
        beauty = beauty.slice(0, 31);
        if(beauty[beauty.length - 1] === ',') {
          beauty = beauty.slice(0, 30);
        }
        if(beauty[beauty.length - 1] === ' ' && beauty[beauty.length - 2] === ',') {
          beauty = beauty.slice(0, 28);
        }
        return trim(beauty.join('')) + '...'
      } else {
        return location
      }
    } catch(e) {
      console.log(e);
    }
  }
  setBarLocationToExpand = i => {
    this.setState({barLocationToExpand: i});
  }
  barsList = () => {
    return this.props.user.bars.map((bar, i) => {
      return (
        <div className='bar' key={i} onMouseOver={() => this.setBarLocationToExpand(i)} onMouseOut={() => this.setBarLocationToExpand(undefined)} onMouse>
          <div className="wantToGo"><FontAwesome name="heart" /></div>
          <div>
            <div className="barNameContainer"><div className="barName" onClick={() => window.open(bar.url, '_blank')}> { bar.name } </div><div className="timestamp"> { bar.timestamp } </div></div>
            <div className="locationContainer" style={{display: "flex"}}>
              <div className="locationTitle"> Location: </div>
              <div className="location">
                <span style={this.state.barLocationToExpand === i && bar.address.length > 31 ? {left: -(bar.address.length - 31) * 7} : {}}>
                  { bar.address }
                </span>
              </div>
            </div>
            <p> Phone: { bar.phone } </p>
          </div>
          <div className="deleteContainer">
            <div onClick={() => this.props.removeBarFromUser(bar.id)} className="delete"><FontAwesome name="trash" /></div>
          </div>
        </div>
      )
    });
  }
  render() {
    return (
      <div className="profileContent">
        <div className="profileAvatar"><FontAwesome name='user' size='3x'/></div>
        <h2 className="profileUsername"> { this.props.user.username } </h2>
        <h4 className="profileEmail"> { this.props.user.email } </h4>
        <div className="profileButtonsContainer">
          <div className="profileButton"> ACTIVITIES </div>
          <div className='profileButton'> SETTINGS </div>
        </div>
        <h3> Recent activities: </h3>
        <div className="barsWrapper">
          <div className="barsContainer" style={{height: this.props.barsContainerHeight}} onWheel={this.props.scroll} >
            <div className="bars" id="bars"
                 style={{top: this.props.barsPosition}}
                 ref={ barsRef => !this.state.barsEl && this.setState({ barsEl: barsRef }) } >
            {
              this.props.user.bars[0] ? this.barsList() : <div> No recent activities </div>
            }
            </div>
            {
              this.state.barsEl && this.props.user.bars.length > 3 ?
              <TheScrollbar barsRef={this.state.barsEl} scrollbarHeight={175} />
              : ''
            }
          </div>
        </div>
      </div>
    )
  }
}

 const mapStateToProps = store => ({
     authState: store.authReducer,
     scrollState: store.scrollReducer
 });

 export default connect(mapStateToProps, {removeBarFromUser})(Content);
