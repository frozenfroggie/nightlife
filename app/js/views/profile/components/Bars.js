import React from 'react';
import FontAwesome from 'react-fontawesome';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

const Bars = (props) => {
  const items = props.bars.map((bar, i) => {
    return (
      <div className={classnames(['bar', {'barFloat': props.barToDelete === bar.id}])} key={bar.name} onMouseOver={() => props.setBarLocationToExpand(i)} onMouseOut={() => props.setBarLocationToExpand(undefined)}>
        <div className="wantToGo"><FontAwesome name="heart" /></div>
        <div>
          <div className="barNameContainer"><div className="barName" onClick={() => window.open(bar.url, '_blank')}> { bar.name } </div><div className="timestamp"> { bar.timestamp } </div></div>
          <div className="locationContainer" style={{display: "flex"}}>
            <div className="locationTitle"> Location: </div>
            <div className="location">
              <span style={props.barLocationToExpand === i && bar.address.length > 34 ? {left: -(bar.address.length - 31) * 7} : {}}>
                { bar.address }
              </span>
            </div>
          </div>
          <p> Phone: { bar.phone } </p>
        </div>
        <div className="deleteContainer">
          <div onClick={() => props.removeBarFromUser(bar.id)} className="delete"><FontAwesome name="trash" /></div>
        </div>
      </div>
    )
  });
  return (
    <div>
      <ReactCSSTransitionGroup
        transitionName="bars"
        transitionEnterTimeout={2000}
        transitionLeaveTimeout={2000}>
        { props.bars[0] ? items : <div> No recent activities </div> }
      </ReactCSSTransitionGroup>
    </div>
  )
}

export default Bars;
