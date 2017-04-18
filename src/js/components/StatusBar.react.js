import React from 'react';

export default class StatusBar extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (<div className="status-bar">
      <span className="status-bar--name">{this.props.name}:</span>
      <div className="status-bar--meter">
        <div className="status-bar--meter-value" style={{width: this.props.value + '%'}}></div>
      </div>
    </div>)
  }
}
