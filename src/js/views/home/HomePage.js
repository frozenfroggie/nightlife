import React from 'react';
import Background from './components/Background'
import Content from './components/Content';

class HomePage extends React.Component {
  render() {
    return (
        <div className="wrapper">
          <Background />
          <Content />
        </div>
    );
  }
};

export default HomePage;
