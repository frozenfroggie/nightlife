import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

import { toogleExpandMenu } from './shared/actions/menuActions';
import { logout, refreshToken, saveUser } from './shared/actions/authActions';

import TheNavigation from './shared/components/TheNavigation';
import TheFooter from './shared/components/TheFooter';

import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import SignupPage from './signup/SignupPage';
import AboutPage from './about/AboutPage';
import BarsPage from './bars/BarsPage';
import ProfilePage from './profile/ProfilePage';

import requireAuth from '../utils/requireAuth';
import setAuthorizationToken from '../utils/setAuthorizationToken';

class App extends React.Component {
  componentDidMount() {
    if(!this.props.authState.isAuthenticated) {
      axios('/socialAuth').then(res => {
        res.data.isAuthenticated && this.props.saveUser(res.data.user);
      });
    } else {
      axios('/socialAuth/getAccounts').then(res => {
        this.props.saveUser(res.data.user);
        this.props.history.push(`/profile`);
      });
    }
    window.innerWidth >= 1024 && !this.props.menuState.expandMenu ? this.props.toogleExpandMenu() : '';
    window.addEventListener('resize', this.handleResizing);
  }
  handleResizing = () => {
    window.innerWidth >= 1024 && !this.props.menuState.expandMenu ? this.props.toogleExpandMenu() : '';
    window.innerWidth < 1024 && this.props.menuState.expandMenu ? this.props.toogleExpandMenu() : '';
  }
  toogleMenuOnMobile = () => {
    window.innerWidth < 1024 && this.props.toogleExpandMenu();
  }
  logout = () => {
    this.toogleMenuOnMobile();
    setTimeout(() => {
      this.props.logout();
    }, 400);
  }
  render() {
    return (
      <Router>
        <div className="container">
          <TheNavigation toogleMenuOnMobile={this.toogleMenuOnMobile} logout={this.logout} isAuthenticated={this.props.authState.isAuthenticated} expandMenu={this.props.menuState.expandMenu} hamburgerClick={this.props.toogleExpandMenu} />
          <Route render={({ location, history }) => (
            <ReactCSSTransitionGroup transitionName="routes" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
            <Switch key={history.location.pathname.split('/')[1] || '/'} pathname={history.location.pathname} location={history.location}>
             <Route exact path="/" component={HomePage} />
             <Route path="/bars" component={BarsPage} />
             <Route path="/about" component={AboutPage} />
             <Route path="/login" component={LoginPage} />
             <Route path="/signup" component={SignupPage} />
             <Route path="/profile" component={requireAuth(ProfilePage)} />
           </Switch >
            </ReactCSSTransitionGroup >
          )}/>
        </div>
      </Router>
    );
  }
}

 const mapStateToProps = store => ({
     menuState: store.menuReducer,
     authState: store.authReducer
 });

 export default connect(mapStateToProps, {saveUser, toogleExpandMenu, logout, refreshToken})(App);
