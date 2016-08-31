import React, { Component, PropTypes as pt } from 'react';


const ProxyComponent = ({ children }) => React.Children.only(children);
ProxyComponent.propTypes = {
  children: pt.oneOfType([pt.node, pt.arrayOf(pt.node)])
};

export default class ChildrenTypes extends Component {
  static propTypes = {
    mode: pt.oneOf([])
  }
  static defaultProps = {
    mode: 'h5'
  }
  render() {
    const { mode } = this.props;
    const iAmThird = 'I am third';
    return (
      <ul>
        <li>
          I am children
        </li>
        <li>
          {'I am children string'}
        </li>
        <li>
          {(() => 'I am children from function')()}
        </li>
        <li>
          {['I am first', 'I am second', iAmThird]}
        </li>
        <li>
          {['I am first', 'I am second', iAmThird].map((item, key) => <div key={key}>{item}</div>)}
        </li>
        <li>
          <ProxyComponent>
            {<b>'I am children in proxy'</b>}
          </ProxyComponent>
        </li>
      </ul>
    );
  }
}
