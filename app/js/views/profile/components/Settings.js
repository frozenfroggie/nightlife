import React from 'react';
import Facebook from '-!svg-react-loader!../../../../assets/Facebook.svg';
import Google from '-!svg-react-loader!../../../../assets/Google.svg';
import Github from '-!svg-react-loader!../../../../assets/Github.svg';
import classnames from 'classnames';

const style = {
    width: 30,
    height: 30
}

const Settings = props => {
  return (
    <div>
      <h3> User settings </h3>
      <div className="settingsWrapper">
        <hr style={{height: 1}} />
        <div className="socialConnections">
          <p className="connections"> Social connections </p>
          <div className="socialBtns">
            <div className="socialBtn">
              <Facebook width={style.width} height={style.height} />
              <span> Facebook </span>
              <a href='/socialAuth/facebook'>
                <div className={classnames(['connect', {'connected': props.user.facebook && props.user.facebook.id}])}> { props.user.facebook.id ? 'Connected' : 'Connect'} </div>
              </a>
            </div>
            <div className="socialBtn">
              <Google width={style.width} height={style.height} />
              <span> Google+ </span>
              <a href='/socialAuth/google'>
                <div className={classnames(['connect', {'connected': props.user.google && props.user.google.id}])}> { props.user.google.id ? 'Connected' : 'Connect'} </div>
              </a>
            </div>
            <div className="socialBtn">
              <Github width={style.width} height={style.height} />
              <span> Github </span>
              <a href='/socialAuth/github'>
                <div className={classnames(['connect', {'connected': props.user.github && props.user.github.id}])}> { props.user.github.id ? 'Connected' : 'Connect'} </div>
              </a>
            </div>
          </div>
        </div>
        <hr style={{height: 1}} />
        <div className='logout'>
          <div className='logoutButton'>
            Logout from other devices
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings;
