import React from 'react';

import L from '../helpers/l10n';

import Link from './Link.react';

export default class HeroListView extends React.Component {

  static propTypes = {
    heroes: React.PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var heroes = this.props.heroes;

    heroes = heroes.map((hero) => {
      var classNames = 'hero-list-view--hero-image Heroes_' + hero.shortName;

      return (<li key={hero.shortName} className="hero-list-view--hero">
        <Link href={'/' + hero.shortName} className="hero-list-view--hero-link">
          <div className={classNames}></div>
          <span className="hero-list-view--hero-name">{L(hero.fullName)}</span>
        </Link>
      </li>)
    });

    return <div className="hero-list-view-container">
    <ul className="hero-list-view">{heroes}</ul></div>
  }
}
