import React from 'react';
import {connect} from 'react-redux'
import trim from 'lodash/trim';
import FontAwesome from 'react-fontawesome';
import Scrollbar from '../../shared/scroll/Scrollbar';

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      barsEl: null
    }
  }
  beautyLocation(location) {
    let beauty = location.split('');
    if(beauty.length > 38) {
      beauty = trim(beauty.slice(0,30).join(''));
      return beauty + '...'
    } else {
      return location
    }
  }
  barsList = () => {
    return this.props.user.bars.map((bar, i) => {
      return (
        <div className='bar' key={i} >
          <div className="wantToGo"><FontAwesome name="heart" /></div>
          <div>
            <p className="barName"> { bar.name } </p>
            <p className="location"> Location: { this.beautyLocation(bar.address) } </p>
            <p> Phone: { bar.phone } </p>
          </div>
          <div className="deleteContainer">
            <div className="delete"><FontAwesome name="trash" /></div>
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
        <br />
        <div className="profileButtonsContainer">
        <div className="profileButton"> ACTIVITIES </div>
        <div className='profileButton'> SETTINGS </div>
        </div>
        <br />
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
              <Scrollbar barsRef={this.state.barsEl} scrollbarHeight={175} />
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

 export default connect(mapStateToProps, {})(Content);
