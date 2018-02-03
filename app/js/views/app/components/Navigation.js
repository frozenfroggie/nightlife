import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link, NavLink } from 'react-router-dom';
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
            <div><NavLink className="menuLabel" activeClassName="selected" to="/bars">BARS</NavLink></div>
            <div><NavLink className="menuLabel" activeClassName="selected" to="/about">ABOUT</NavLink></div>
            <div><NavLink className="menuLabel" activeClassName="selected" to="/login">LOG IN</NavLink></div>
            <div><NavLink className="menuLabel" activeClassName="selected" to="/signup">SIGN UP</NavLink></div>
            <div className="spaceHolderDesktop"></div>
          </div>
          : ""
        }
      </ReactCSSTransitionGroup>
      <Link to="/">
        <div className="logo">
          <FontAwesome className="glass" name='glass' style={{ transform: "rotate(10deg)" }} />
          <span className="nightlife"> Nightlife </span>
        </div>
      </Link>
    </nav>
  );
};

export default Navigation;
