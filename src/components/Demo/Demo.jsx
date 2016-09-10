import React, { Component } from 'react';
import Helmet from 'react-helmet';
import cx from 'classnames';
import Title from '../../components/Title';

import styles from './Demo.styl';

export default class Demo extends Component {
  render() {
    return (
      <div className={cx(styles.demo)}>
        <Helmet title='Demo' />
        <Title mode='h2'>
          Redux boilerplate title
        </Title>
      </div>
    );
  }
}
