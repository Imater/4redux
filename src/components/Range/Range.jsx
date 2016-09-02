import React, { Component, PropTypes as pt } from 'react';
import cx from 'classnames';

import styles from './Range.styl';

import Handle from './Handle';

export default class Range extends Component {
  state = {
    rangeLineWidth: 0
  };

  static propTypes = {
    mode: pt.oneOf(['default']),
    valueLeft: pt.number,
    valueRight: pt.number,
    onChange: pt.func
  }
  static defaultProps = {
    mode: 'default',
    onChange: () => {}
  }

  handleChangeLeft = event => {
    const newValue = parseFloat(event.target.value) || 0;
    this.setValueLeft(newValue);
  };

  handleChangeRight = event => {
    const newValue = parseFloat(event.target.value) || 0;
    this.setValueRight(newValue);
  };

  setValueLeft = value => {
    const { onChange, valueRight } = this.props;
    onChange(value, valueRight);
  };

  setValueRight = value => {
    const { onChange, valueLeft } = this.props;
    onChange(valueLeft, value);
  };

  setValueLeftPx = valuePx => {
    const value = (valuePx / this.state.rangeLineWidth) * 100;
    this.setValueLeft(value);
  };

  setValueRightPx = valuePx => {
    const value = (valuePx / this.state.rangeLineWidth) * 100;
    this.setValueRight(value);
  };

  componentDidMount() {
    this.rangeLineWidth = this.rangeLine.offsetWidth;
    this.setState({
      rangeLineWidth: this.rangeLineWidth
    });
  }

  render() {
    const { mode, valueLeft, valueRight } = this.props;
    const rangeLineWidth = this.state.rangeLineWidth;
    const valueLeftPx = (valueLeft * rangeLineWidth) / 100;
    const valueRightPx = (valueRight * rangeLineWidth) / 100;
    return (
      <div
        className={
          cx(styles[`mode_${mode}`], {
          })
        }
      >
        <input value={valueLeft} onChange={this.handleChangeLeft} />
        <input value={valueRight} onChange={this.handleChangeRight} />

        <div className={styles.rangeLine} ref={elem => this.rangeLine = elem}>
          <Handle value={valueLeftPx} onChange={this.setValueLeftPx} />
          <Handle value={valueRightPx} onChange={this.setValueRightPx} />
        </div>
      </div>
    );
  }
}
