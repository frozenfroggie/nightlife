import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Switch } from 'react-router-dom'

import { toogleExpandMenu } from './actions/menuActions';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

import HomePage from '../home/HomePage';
import LoginPage from '../login/LoginPage';
import SignupPage from '../signup/SignupPage';
import AboutPage from '../about/AboutPage';
import BarsPage from '../bars/BarsPage';

class App extends React.Component {
  componentDidMount() {
    window.innerWidth >= 1024 && !this.props.menuState.expandMenu ? this.props.toogleExpandMenu() : '';
    window.addEventListener('resize', this.handleResizing);
  }
  handleResizing = () => {
    window.innerWidth >= 1024 && !this.props.menuState.expandMenu ? this.props.toogleExpandMenu() : '';
    window.innerWidth < 1024 && this.props.menuState.expandMenu ? this.props.toogleExpandMenu() : '';
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation expandMenu={this.props.menuState.expandMenu} hamburgerClick={this.props.toogleExpandMenu} />
          <Route render={({ location, history }) => (
            <ReactCSSTransitionGroup transitionName="routes" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
              <Switch key={history.location.pathname.split('/')[1] || '/'} pathname={history.location.pathname} location={history.location}>
                <Route exact path="/" component={HomePage} />
                <Route path="/bars" component={BarsPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
              </Switch >
            </ReactCSSTransitionGroup >
          )}/>
        </div>
      </Router>
    );
  }
}

 const mapStateToProps = store => ({
     menuState: store.menuReducer
 });

 export default connect(mapStateToProps, {toogleExpandMenu: toogleExpandMenu})(App);
