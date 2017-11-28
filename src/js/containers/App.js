import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../../styles/index.scss';
import '../canvas';
import { connect } from 'react-redux';

//actions
import { toogleExpandMenu } from '../actions/menuActions';

//components
import Navigation from '../components/Navigation';
import Content from '../components/Content';
import Footer from '../components/Footer';

//containers
import Home from './Home';
import About from './About';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleResizing = this.handleResizing.bind(this);
  }
  componentDidMount() {
    window.innerWidth >= 1024 && !this.props.menuState.expandMenu ? this.props.toogleExpandMenu() : '';
    window.addEventListener('resize', this.handleResizing);
  }
  handleResizing() {
    window.innerWidth >= 1024 && !this.props.menuState.expandMenu ? this.props.toogleExpandMenu() : '';
    window.innerWidth < 1024 && this.props.menuState.expandMenu ? this.props.toogleExpandMenu() : '';
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation expandMenu={this.props.menuState.expandMenu} hamburgerClick={this.props.toogleExpandMenu} />
          <Content />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Footer />
        </div>
      </Router>
    );
  }
}

 const mapStateToProps = store => ({
     menuState: store.menuReducer
 });

 export default connect(mapStateToProps, {toogleExpandMenu: toogleExpandMenu})(App);
