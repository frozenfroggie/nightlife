import React from 'react';
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Bars from '../components/Bars';
import TheScrollbar from '../../shared/components/TheScrollbar';
import {removeBarFromUser} from '../../bars/actions/barActions.js';

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barsEl: null,
      barLocationToExpand: undefined,
      barToDelete: undefined
    }
  }
  setBarLocationToExpand = i => {
    this.setState({barLocationToExpand: i});
  }
  removeBar = barId => {
    this.setState({barToDelete: barId}, () => {
      setTimeout(() => {
        this.props.removeBarFromUser(barId)
      }, 300);
    });
  }
  render() {
    return (
      <div>
        <h3> Recent activities </h3>
        <div className="barsWrapper">
          <div className="barsContainer" style={{height: this.props.scrollState.barsContainerHeight}} onWheel={this.props.scroll} >
          <div className="bars" id="bars"
            style={{top: this.props.scrollState.barsPosition}}
            ref={ barsRef => !this.state.barsEl && this.setState({ barsEl: barsRef }) } >
                {
                    <Bars bars={this.props.authState.user.bars}
                          setBarLocationToExpand={(i) => this.setBarLocationToExpand(i)}
                          barLocationToExpand={this.state.barLocationToExpand}
                          removeBarFromUser={(barId) => this.removeBar(barId)}
                          barToDelete={this.state.barToDelete}
                          />
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
