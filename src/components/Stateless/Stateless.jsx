import React, { PropTypes } from 'react'

const Stateless = ({ title }) => <div>I am stateless with title = {title}</div>

Stateless.defaultProps = {
  title: 'default title'
}

Stateless.propTypes = {
  title: PropTypes.string
}

export default Stateless
