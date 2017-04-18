import React from 'react';

import HeroBuilderActions from '../actions/HeroBuilderActions';

import L from '../helpers/l10n';

export default class TalentBox extends React.Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    talent: React.PropTypes.array.isRequired,
    level: React.PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    this.props = props;
    this.selectTalent = this.selectTalent.bind(this);
  }

  selectTalent(index) {
    HeroBuilderActions.selectTalentForActiveHero(this.props.level, index);
  }

  render() {
    var talentLevel = this.props.talent;
    var level = this.props.level;
    var selectedTalents = this.props.selectedTalents;

    return (<div className="talent-box">
      <span className="talent-box--path">{this.props.label}</span>
      <ul className="talent-box--list">
        {
          talentLevel.map((talent, index) => {
            var classNames = (selectedTalents[level] === index+1) ? 'talent-box--talent selected' : 'talent-box--talent';
            return (<li key={talent.name.en} className={classNames} onClick={this.selectTalent.bind(this, index+1)}>
              <span className="talent-box--talent-name">{L(talent.name)}</span>
              <span className="talent-box--talent-description">{L(talent.description)}</span>
            </li>)
          }.bind(this))
        }
      </ul>
    </div>)
  }

}
