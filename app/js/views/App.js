import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { toogleExpandMenu } from './shared/actions/menuActions';
import { logout, refreshToken } from './shared/actions/authActions';

import TheNavigation from './shared/components/TheNavigation';
import TheFooter from './shared/components/TheFooter';

import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import SignupPage from './signup/SignupPage';
import AboutPage from './about/AboutPage';
import BarsPage from './bars/BarsPage';
import ProfilePage from './profile/ProfilePage';
import PageNotFound from './404/PageNotFound';

import requireAuth from './shared/utils/requireAuth';
import setAuthorizationToken from './shared/utils/setAuthorizationToken';

class App extends React.Component {
  componentDidMount() {
    const timer = JSON.parse(localStorage.getItem('timer'));
    console.log(timer - Date.now());

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
  logout = e => {
    e.preventDefault();
    this.props.logout();
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
                <Route component={PageNotFound} />
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

 export default connect(mapStateToProps, {toogleExpandMenu, logout, refreshToken})(App);
