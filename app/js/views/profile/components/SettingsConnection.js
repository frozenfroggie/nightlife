import React from 'react';
import classnames from 'classnames';

const SettingsConnection = props => {
  return (
    <div>
      {
        props.isConnected ?
          <div onClick={() => props.disconnect(props.socialName)}>
            <div className={classnames(['connect', 'connected'])}> Connected </div>
          </div>
          :
          <a href={`/socialAuth/${props.socialName}`}>
            <div className='connect'> Connect </div>
          </a>
      }
    </div>
  )
}

export default SettingsConnection;
