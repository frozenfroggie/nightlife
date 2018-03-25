import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
     super(props)
     this.state = {
       shouldRedirect: false
     }
   }
    componentWillMount() {
      if (!this.props.authState.isAuthenticated) {
        this.setState({shouldRedirect: true});
      }
    }
    render() {
      if (this.state.shouldRedirect && this.props.location.pathname !== '/') {
        return <Redirect to="/" />;
      }
      return (
        <div>
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  const mapStateToProps = store => ({
      authState: store.authReducer
  });

  return withRouter(connect(mapStateToProps, null)(Authenticate));
}
