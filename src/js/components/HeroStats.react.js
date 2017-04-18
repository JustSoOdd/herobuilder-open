import React from 'react';

// Components
import StatusBar from './StatusBar.react';

export default class CharacterStats extends React.Component {

  static propTypes = {
    hero: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var hero = this.props.hero;

    return (<div className="hero-stats">
      <StatusBar name="Attack" value={hero.attackStat} />
      <StatusBar name="Defense" value={hero.defenseStat} />
      <StatusBar name="Mobility" value={hero.mobilityStat} />
      <StatusBar name="Utility" value={hero.utilityStat} />
    </div>)
  }
}
