import React from 'react';

// Components
import HeroStats from './HeroStats.react';

// Helpers
import L from '../helpers/l10n';

export default class HeroPortrait extends React.Component {

  static propTypes = {
    hero: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var hero = this.props.hero;
    var heroImageClasses = 'hero-portrait--avatar-image image-large Heroes_' + hero.shortName;

    return (<div className="hero-portrait">
      <div className="hero-portrait--avatar">
        <div className={heroImageClasses} />
      </div>
      <div className="hero-portrait--text">
        <h1 className="hero-portrait--text-name">{L(hero.fullName)}</h1>
        <p className="hero-portrait--text-description">{L(hero.description)}</p>
        <p className="hero-portrait--text-flavortext">{L(hero.flavorText)}</p>
      </div>
      <HeroStats hero={hero} />
    </div>)
  }
}
