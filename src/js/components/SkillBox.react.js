import React from 'react';

// Helpers
import L from '../helpers/l10n';

import SkillButtonConstants from '../constants/SkillButtonConstants'

import SkillIcon from './SkillIcon.react';

export default class SkillBox extends React.Component {

  static propTypes = {
    hero: React.PropTypes.object.isRequired,
    skillId: React.PropTypes.string.isRequired,
    selectedSkills: React.PropTypes.array
  }

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var hero = this.props.hero;
    var shortName = hero.shortName;
    var skill = hero.skills[this.props.skillId];
    var lore = Object.keys(skill.lore).length > 0 ? L(skill.lore) : "";
    return (<div className="skill-box">
      <h3 className="skill-box--key">{SkillButtonConstants.SkillButtonConstants[this.props.skillId]}</h3>
      <div className="skill-box--inner">
        <div className="skill-box--details">
          <h3 className="skill-box--details-name">{L(skill.name)}</h3>
          <p className="skill-box--details-lore" dangerouslySetInnerHTML={{__html:lore }}></p>
          <p className="skill-box--details-description" dangerouslySetInnerHTML={{__html:L (skill.description) }}></p>
        </div>

        <div className="skill-box--left">
          {(() => {
            if (skill.upgrades.LL) {
              return (<div className="skill-box--flex">
                <SkillIcon upgrade={skill.upgrades.LL} heroName={shortName} skillId={this.props.skillId} skillPath="LL" selectedSkills={this.props.selectedSkills} />
              </div>)
            }
          })()}

          {(() => {
            if (skill.upgrades.LR) {
              return (<div className="skill-box--flex">
                <SkillIcon upgrade={skill.upgrades.LR} heroName={shortName} skillId={this.props.skillId} skillPath="LR" selectedSkills={this.props.selectedSkills} />
              </div>)
            }
          })()}

          <div className="skill-box--flex">
            <SkillIcon upgrade={skill.upgrades.L} heroName={shortName} skillId={this.props.skillId} skillPath="L" selectedSkills={this.props.selectedSkills} />
          </div>
        </div>

        <div className="skill-box--right">
          {(() => {
            if (skill.upgrades.RL) {
              return (<div className="skill-box--flex">
                <SkillIcon upgrade={skill.upgrades.RL} heroName={shortName} skillId={this.props.skillId} skillPath="RL" selectedSkills={this.props.selectedSkills} />
              </div>)
            }
          })()}
          {(() => {
            if (skill.upgrades.RR) {
              return (<div className="skill-box--flex">
                <SkillIcon upgrade={skill.upgrades.RR} heroName={shortName} skillId={this.props.skillId} skillPath="RR" selectedSkills={this.props.selectedSkills} />
              </div>)
            }
          })()}
          <div className="skill-box--flex">
            <SkillIcon upgrade={skill.upgrades.R} heroName={shortName} skillId={this.props.skillId} skillPath="R" selectedSkills={this.props.selectedSkills} />
          </div>
        </div>
      </div>
    </div>)
  }
}
