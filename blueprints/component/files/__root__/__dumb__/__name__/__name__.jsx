import React, { Component, PropTypes as pt } from 'react'
import pureRender from 'pure-render-decorator'
import styles from './<%= pascalEntityName %>.styl'

@pureRender
class <%= pascalEntityName %> extends Component {

  static propTypes = {
  }

  render() {
    return (
      <div className={styles.<%= pascalEntityName %>}>
        <h1><%= pascalEntityName %></h1>
      </div>
    )
  }
}

export default <%= pascalEntityName %>
