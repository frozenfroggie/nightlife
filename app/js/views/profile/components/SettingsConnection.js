import React from 'react';
import classnames from 'classnames';

const SettingsConnection = props => {
  return (
    <div className={classnames(['connect', {'connected': props.isConnected}])}>
      {
        props.isConnected ?
          <div onClick={() => props.disconnect(props.socialName)}>
            <div> Connected </div>
          </div>
          :
          <a href={`/socialAuth/${props.socialName}`}>
            <div> Connect </div>
          </a>
      }
    </div>
  )
}

export default SettingsConnection;
