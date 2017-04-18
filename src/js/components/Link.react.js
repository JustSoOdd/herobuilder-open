import React from 'react';

import Router from '../helpers/Router';

export default class Link extends React.Component {

  static propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    href: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    className: 'link'
  }

  constructor(props) {
    super(props);
    this.props = props;
    this.switchRoute = this.switchRoute.bind(this);
  }

  switchRoute(evt) {
    evt.preventDefault();
    Router.setRoute(this.props.href);
  }

  render() {
    return (<a href={this.props.href} className={this.props.className} onClick={this.switchRoute}>
      {this.props.children}
    </a>)
  }
}
