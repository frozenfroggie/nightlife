import React from 'react';
import FontAwesome from 'react-fontawesome';

import Activities from '../containers/Activities';
import Settings from '../components/Settings';

const Content = (props) => {
  return (
    <div className="profileContent">
      <div className="profileAvatar"><FontAwesome name='user' size='3x'/></div>
      <h2 className="profileUsername"> { props.user.username } </h2>
      <h4 className="profileEmail"> { props.user.email } </h4>
      <div className="profileButtonsContainer">
        <div className="profileButton" onClick={() => props.handleClick(false)}> ACTIVITIES </div>
        <div className='profileButton' onClick={() => props.handleClick(true)}> SETTINGS </div>
      </div>
      {
        !props.showSettings ?
          <Activities scroll={props.scroll} authState/>
          :
          <Settings />
      }
    </div>
  )
}

  // beautyLocation(location) {
  //   try {
  //     let beauty = location.split('');
  //     if(beauty.length > 31) {
  //       beauty = beauty.slice(0, 31);
  //       if(beauty[beauty.length - 1] === ',') {
  //         beauty = beauty.slice(0, 30);
  //       }
  //       if(beauty[beauty.length - 1] === ' ' && beauty[beauty.length - 2] === ',') {
  //         beauty = beauty.slice(0, 28);
  //       }
  //       return trim(beauty.join('')) + '...'
  //     } else {
  //       return location
  //     }
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

export default Content;
