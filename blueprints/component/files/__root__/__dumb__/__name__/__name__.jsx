import React, { Component, PropTypes as pt } from 'react'
import pureRender from 'pure-render-decorator'
import classNames from 'classnames/bind'
import styles from './<%= pascalEntityName %>.styl'

const cx = classNames.bind(styles)

@pureRender
class <%= pascalEntityName %> extends Component {

  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    return (
      <div className={cx('<%= pascalEntityName %>')}>
        <h1><%= pascalEntityName %></h1>
      </div>
    )
  }
}

export default <%= pascalEntityName %>
