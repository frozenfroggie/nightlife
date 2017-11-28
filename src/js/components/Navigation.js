import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const Navigation = props => {
  return (
    <nav>
      <div><button onClick={props.hamburgerClick} className= { props.expandMenu ? "hamburger close" : "hamburger" } ><span></span></button></div>
      <ReactCSSTransitionGroup
      transitionName="menu"
      transitionEnterTimeout={250}
      transitionLeaveTimeout={150}>
        {
          props.expandMenu ?
          <div className="menu">
            <div className="spaceHolderMobile"></div>
            <div><Link to="/about">Bars</Link></div>
            <div><Link to="/about">About</Link></div>
            <div><Link to="/about">Log in</Link></div>
            <div><Link to="/about">Sign up</Link></div>
            <div className="spaceHolderDesktop"></div>
          </div>
          : ""
        }
      </ReactCSSTransitionGroup>
      <div className="logo"> <FontAwesome className="glass" name='glass' style={{ transform: "rotate(10deg)" }} /> <span className="nightlife">Nightlife</span> </div>
    </nav>
  );
};

export default Navigation;
