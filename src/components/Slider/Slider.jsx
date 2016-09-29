import React, { Component, PropTypes as pt } from 'react';
import cx from 'classnames';

import styles from './Slider.styl';

export default class Slider extends Component {
  state = {
    offset: 0
  }

  static propTypes = {
    onChange: pt.func,
    slides: pt.array,
    current: pt.number
  }
  static defaultProps = {
    current: 0,
    slides: [],
    onChange: () => {}
  }

  handleKey = event => {
    const keys = {
      ArrowLeft: this.handleLeftArrow,
      ArrowRight: this.handleRightArrow,
      KeyH: this.handleLeftArrow,
      KeyL: this.handleRightArrow,
      PageUp: this.handleLeftArrow,
      PageDown: this.handleRightArrow,
      Home: () => this.setCurrent(0),
      End: () => this.setCurrent(this.props.slides.length - 1)
    };
    const fn = keys[event.code];

    console.info(event.code);

    if (typeof fn !== 'undefined') {
      fn();
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey);
  }

  setCurrent = current => {
    const { onChange } = this.props;

    if (current < 0) {
      return this.shake(-10)
    } else if (current > this.props.slides.length - 1) {
      return this.shake(+10);
    }

    onChange(current);
  }

  handleLeftArrow = () => {
    const { current } = this.props;

    this.setCurrent(current - 1);
  }

  handleRightArrow = () => {
    const { current } = this.props;

    this.setCurrent(current + 1);
  }

  renderSlide = (item, key) =>
    <div
      key={key}
      className={styles.Slide}
    >
      {item}
    </div>

  shake = offset => {
    this.setState({
      offset
    });

    setTimeout(() => {
      this.setState({
        offset: 0
      });
    }, 400);
  }

  render() {
    const { current, slides } = this.props;
    const marginLeft = -(current * 100 + this.state.offset);

    return (
      <div className={styles.Slider}>
        <div className={styles.SliderWrapper}>
          <div
            className={styles.Slides}
            style={{
              transform: `translateX(${marginLeft}%)`
            }}
          >
            {slides.map(this.renderSlide)}
          </div>
        </div>
        <div
          className={styles.arrowLeft}
          onClick={this.handleLeftArrow}
        />
        <div
          className={styles.arrowRight}
          onClick={this.handleRightArrow}
        />
      </div>
    );
  }
}
