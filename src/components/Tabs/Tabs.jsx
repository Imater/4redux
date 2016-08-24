import React, { Component, PropTypes as pt } from 'react';
import cx from 'classnames';

import styles from './Tabs.styl';

export default class Tabs extends Component {
  static propTypes = {
    mode: pt.oneOf(['default']),
    active: pt.oneOfType([pt.number, pt.string]),
    renderer: pt.func,
    onChange: pt.func,
    tabs: pt.array
  }
  static defaultProps = {
    mode: 'default',
    renderer: () => {},
    onChange: () => {},
    tabs: []
  }
  activateTab = newActive => () => {
    const { onChange } = this.props;
    console.info('clicked!!!', newActive);
    onChange(newActive);
  };
  renderTab = (tab, index) => {
    const { active } = this.props;
    const key = tab.id || index;
    console.info('tab', styles);
    return (
      <li
        className={cx(styles.tabTitle, {
          [styles.tabActive]: key === active
        })}
        key={tab.id || index}
        onClick={this.activateTab(key)}
      >
        {tab.title}
      </li>
    );
  };
  render() {
    const { mode, renderer, active, tabs } = this.props;
    return (
      <div>
        <ul>
          {tabs.map(this.renderTab)}
        </ul>
        <div className={cx(styles[`mode_${mode}`])}>
          {renderer(active)}
        </div>
      </div>
    );
  }
}
