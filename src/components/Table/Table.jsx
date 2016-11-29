import React, { PropTypes as pt } from 'react'
import classNames from 'classnames'
import path from 'ramda/src/path'

import styles from './Table.styl'

const readStyle = key => path([key])
const component = styleReader => ({ children, className, width }) => ( // eslint-disable-line
  <div
    className={classNames({
      [styleReader(styles)]: true,
      [className]: className
    })}
    style={{
      width
    }}
  >
    {children}
  </div>
)

export const Table = component(readStyle('table'))
export const Tr = component(readStyle('tr'))
export const Td = component(readStyle('td'))

Table.displayName = 'Table'
Tr.displayName = 'Tr'
Td.displayName = 'Td'

const propTypes = {
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)]),
  width: pt.number,
  className: pt.string
}

Table.propTypes = propTypes

Tr.propTypes = propTypes

Td.propTypes = propTypes
