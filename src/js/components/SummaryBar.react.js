import React from 'react';

import SkillIcon from './SkillIcon.react';
import SkillPlaceholder from './SkillPlaceholder.react';

import L from '../helpers/l10n';

export default class SummaryBar extends React.Component {

  static propTypes = {
    heroName: React.PropTypes.string.isRequired,
    skills: React.PropTypes.object.isRequired,
    selectedSkills: React.PropTypes.array.isRequired,
    talents: React.PropTypes.object.isRequired,
    selectedTalents: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.props = props;
  }

  getTalentForLevel(level) {
    if (this.props.selectedTalents[level]) {
      return this.props.talents[level][this.props.selectedTalents[level]-1];
    } else {
      return false;
    }
  }

  /**
   * Returns a static size array for skills
   * to be able to display placeholders
   */
  getStaticSizeArrayForSkills() {
    var skills = this.props.selectedSkills.concat([]);
    while(skills.length < 10) {
      skills.push(false);
    }
    return skills;
  }

  /**
   * Returns a talent element for a given level
   */
  getTalentElementForLevel(level) {
    var talent = this.getTalentForLevel(level);

    if (!talent) {
      return '';
    } else {
      return (<div>
          <div className="summary-bar--talent-title">{L(talent.name)}</div>
          <div className="summary-bar--talent-description tooltip">{L(talent.description)}</div>
        </div>);
    }
  }

  render() {
    var heroName = this.props.heroName;
    var skills = this.props.skills;
    var selectedSkills = this.getStaticSizeArrayForSkills();

    return (<div className="summary-bar">
      <div className="summary-bar--skills">
        <label className="summary-bar--label">Selected Skills</label>
        <ul className="summary-bar--skills">
          {selectedSkills.map(function(skill, index) {
            var element;

            if (!skill) {
              element = (<li className="summary-bar--skill">
                <div className="summary-bar--skill--level">{index+1}</div>
                <SkillPlaceholder />
              </li>);
            } else {
              element = (<li className="summary-bar--skill">
                <div className="summary-bar--skill--level">{index+1}</div>
                <SkillIcon heroName={heroName} upgrade={skills[skill[0]].upgrades[skill[1]]} skillId={skill[0]} skillPath={skill[1]} />
              </li>)
            }

            return element;
          }.bind(this))}
        </ul>
      </div>
      <div className="summary-bar--talents">
        <label className="summary-bar--label">Passives</label>
        <ul className="summary-bar--talent-box">
          <li className="summary-bar--talent">
            {this.getTalentElementForLevel(3)}
          </li>
          <li className="summary-bar--talent">
            {this.getTalentElementForLevel(5)}
          </li>
          <li className="summary-bar--talent">
            {this.getTalentElementForLevel(7)}
          </li>
          <li className="summary-bar--talent">
            {this.getTalentElementForLevel(9)}
          </li>
        </ul>
      </div>
    </div>)
  }
}
