import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import config from '../../config';

import styles from './App.styl';

@asyncConnect([{
  promise: () => new Promise(resolve => resolve())
}])
@connect(
  ({ settings }) => ({
    settings
  })
)
class App extends Component {
  static propTypes = {
    settings: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
  };

  render() {
    const { settings: { appName }, children } = this.props;

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head || appName} />
        {children}
      </div>
    );
  }
}

export default App;
