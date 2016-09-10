import React, { PureComponent, PropTypes as pt } from 'react';
import classes from './<%= pascalEntityName %>.scss'

class <%= pascalEntityName %> extends PureComponent {

  static propTypes = {

  }

  render() {
    return (
      <div className={classes['<%= pascalEntityName %>']}>
        <h1><%= pascalEntityName %></h1>
      </div>
    )
  }
}

export default <%= pascalEntityName %>
