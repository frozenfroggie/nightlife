import React from 'react';
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome';

import TheScrollbar from '../../shared/components/TheScrollbar';
import {removeBarFromUser} from '../../bars/actions/barActions.js';

class Activities extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      barsEl: null,
      barLocationToExpand: undefined
    }
  }
  barsList = () => {
    return this.props.authState.user.bars.map((bar, i) => {
      return (
        <div className='bar' key={i} onMouseOver={() => this.setBarLocationToExpand(i)} onMouseOut={() => this.setBarLocationToExpand(undefined)}>
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
  setBarLocationToExpand = i => {
    this.setState({barLocationToExpand: i});
  }
  render() {
    return (
      <div>
        <h3> Recent activities: </h3>
        <div className="barsWrapper">
          <div className="barsContainer" style={{height: this.props.scrollState.barsContainerHeight}} onWheel={this.props.scroll} >
          <div className="bars" id="bars"
            style={{top: this.props.scrollState.barsPosition}}
            ref={ barsRef => !this.state.barsEl && this.setState({ barsEl: barsRef }) } >
              {
                this.props.authState.user.bars[0] ? this.barsList() : <div> No recent activities </div>
              }
            </div>
              {
                this.state.barsEl && this.props.authState.user.bars.length > 3 ?
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

 export default connect(mapStateToProps, {removeBarFromUser})(Activities);
