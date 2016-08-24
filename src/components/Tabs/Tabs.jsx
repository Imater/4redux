import React, { Component, PropTypes as pt } from 'react';
import cx from 'classnames';

import styles from './Tabs.styl';

export default class Tabs extends Component {
  static propTypes = {
    mode: pt.oneOf(['default']),
    tabs: pt.array,
    activeId: pt.oneOfType([pt.string, pt.number]),
    onChange: pt.func,
    renderer: pt.func
  }

  static defaultProps = {
    mode: 'default',
    tabs: [],
    renderer: () => {},
    onChange: () => () => {}
  }

  handleClick = newActiveId => () => {
    const { onChange } = this.props;
    onChange(newActiveId);
  }

  renderTab = (tab, index) => {
    const { activeId } = this.props;
    const key = tab.id || index;
    return (
      <li
        key={key}
        onClick={this.handleClick(key)}
        className={cx(styles.tabTitle, {
          [styles.tabTitleActive]: activeId === key
        })}
      >
        {tab.title}
      </li>
    );
  };

  render() {
    const { mode, tabs, renderer, activeId } = this.props;
    return (
      <div>
        <ul>
          {tabs.map(this.renderTab)}
        </ul>
        <div
          className={
            cx(styles[`mode_${mode}`], {
            })
          }
        >
          {renderer(activeId)}
        </div>
      </div>
    );
  }
}
