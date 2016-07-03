import React, { Component } from 'react';
import Helmet from 'react-helmet';

import styles from './Demo.styl';

export default class Demo extends Component {
  render() {
    return (
      <div className={styles.demo}>
        <Helmet title='Demo' />
        <h2>
          Redux boilerplate
        </h2>
      </div>
    );
  }
}
