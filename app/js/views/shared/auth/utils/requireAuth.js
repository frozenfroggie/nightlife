import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (this.props.location.pathname !== '/' && !this.props.authState.isAuthenticated) {
        this.props.history.push(`/`);
      }
    }
    render() {
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
