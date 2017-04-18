import React from 'react';

// Helpers
import L from '../helpers/l10n';

// Actions
import HeroBuilderActions from '../actions/HeroBuilderActions';

export default class SkillIcon extends React.Component {

  static propTypes = {
    heroName: React.PropTypes.string.isRequired,
    skillId: React.PropTypes.string.isRequired,
    skillPath: React.PropTypes.string.isRequired,
    selectedSkills: React.PropTypes.array,
    upgrade: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.props = props;
    this.isSelectable = this.isSelectable.bind(this);
    this.selectSkill = this.selectSkill.bind(this);
    this.skillSelected = this.skillSelected.bind(this);
  }

  // [0, L], [1, L]
  isSelectable() {
    var skillPath = this.props.skillPath;
    var selectedSkills = this.props.selectedSkills;

    switch (skillPath.length) {
      case 1:
        return selectedSkills.filter(function(skill) {
          return skill[0] === this.props.skillId;
        }.bind(this)).length <= 1;

      case 2:
        return selectedSkills.filter(function(skill) {
          return skill[0] === this.props.skillId && skill[1] === this.props.skillPath[0].split('')[0];
        }.bind(this)).length >= 1 && this.props.selectedSkills.length + 1 !== 11;
    }

    return false;
  }

  selectSkill() {
    if (this.isSelectable()) {
      HeroBuilderActions.selectSkillForActiveHero(this.props.skillId, this.props.skillPath);
    }
  }

  skillSelected() {
    var selectedIndex = -1;
    var skillId = this.props.skillId;
    var skillPath = this.props.skillPath;

    this.props.selectedSkills.some((skill, index) => {
      if (skill[0] === skillId && skill[1] === skillPath) {
        selectedIndex = index + 1;
        return true;
      }
      return false;
    });

    return selectedIndex;
  }

  render() {
    var heroName = this.props.heroName;
    var skillId = this.props.skillId;
    var selectedSkills = this.props.selectedSkills;

    var upgrade = this.props.upgrade;
    var selectedIndex;
    var classNames = ['skill-icon'];
    var skillBubble = null;
    var grayedOut = true;

    // Fetch the image
    var skillImageClasses = [];

    // Add selected class if applicable
    if (selectedSkills) {
      if (this.isSelectable()) {
        classNames.push('selectable');
        grayedOut = false;
      }

      selectedIndex = this.skillSelected();
      if (selectedIndex > -1) {
        classNames.push('selected');
        skillBubble = <div className="skill-icon--bubble">{selectedIndex}</div>
        grayedOut = false;
      }
    } else {
      grayedOut = false;
    }

    if (grayedOut) {
      skillImageClasses.push('Skills_' + heroName + skillId + '_Desaturated');
    } else {
      skillImageClasses.push('Skills_' + heroName + skillId);
    }

    return (<div className={classNames.join(' ')} onClick={this.selectSkill.bind(this)}>
      <div className="skill-icon--image-wrapper">
        <div className={skillImageClasses.join(' ')}></div>
        {skillBubble}
      </div>
      <div className="skill-icon--name">{L(upgrade.name)}</div>
      <div className="skill-icon--description tooltip" dangerouslySetInnerHTML={{__html: L(upgrade.description) }}></div>
    </div>)
  }
}
