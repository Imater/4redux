import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import styles from './Image.styl'

export default class Image extends Component {
  static propTypes = {
    className: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    src: PropTypes.string,
    backgroundSize: PropTypes.string,
    backgroundPosition: PropTypes.string,
    mode: PropTypes.string
  }

  static defaultProps = {
    backgroundPosition: 'center',
    backgroundSize: 'contain'
  }

  render() {
    const {
      src,
      className,
      width,
      maxWidth,
      height,
      maxHeight,
      backgroundSize,
      backgroundPosition,
      mode
    } = this.props
    const noImageUrl = '/no-image-new.png'
    return (
      <div
        style={{
          width,
          maxWidth,
          height,
          maxHeight,
          backgroundImage: src ? `url('${src}')` : `url('${noImageUrl}')`,
          backgroundSize,
          backgroundPosition
        }}
        className={classNames({
          [styles.image]: true,
          [className]: true,
          [styles[mode]]: !!mode
        })}
      />
    )
  }
}
