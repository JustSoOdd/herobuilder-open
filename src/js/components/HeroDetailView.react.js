import React from 'react';

// Components
import HeroPortrait from './HeroPortrait.react';
import ShareBox from './ShareBox.react';
import SkillBox from './SkillBox.react';
import Sticky from 'react-sticky';
import SummaryBar from './SummaryBar.react';
import TalentBox from './TalentBox.react';
import SkinBox from './SkinBox.react';

// Actions
import HeroBuilderActions from '../actions/HeroBuilderActions';

export default class HeroDetailView extends React.Component {

  static propTypes = {
    hero: React.PropTypes.object.isRequired,
    selectedSkills: React.PropTypes.array.isRequired,
    selectedTalents: React.PropTypes.object.isRequired,
    shareBoxState: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.props = props;
    this.resetHero = this.resetHero.bind(this);
    this._renderTalentBoxes = this._renderTalentBoxes.bind(this);
  }

  resetHero() {
    HeroBuilderActions.resetHero(this.props.hero);
  }

  stickyStateChange() {
    var placeholder = this.refs.stickyPlaceholder.getDOMNode();
    placeholder.style.height = this.refs.stickyElement.getDOMNode().getBoundingClientRect().height + 'px';
  }

  scrollToTop() {
    scroll(0, 0);
  }

  toggleShareBox() {
    HeroBuilderActions.toggleShareBox();
  }

  render() {
    var hero = this.props.hero;
    var selectedSkills = this.props.selectedSkills;
    var selectedTalents = this.props.selectedTalents;
    var talentBoxes = this._renderTalentBoxes(selectedTalents);

    var shareBox = (this.props.shareBoxState ? <ShareBox heroName={hero.fullName}/> : '');
    return (<div className="hero-detail-view">
      <div className="sticky-placeholder" ref="stickyPlaceholder">
        <Sticky onStickyStateChange={this.stickyStateChange.bind(this)} ref="stickyElement">
          <HeroPortrait hero={hero} />
          <SummaryBar heroName={hero.shortName} skills={hero.skills} selectedSkills={selectedSkills} talents={hero.talents} selectedTalents={selectedTalents} />
          <a className="hero-detail-view--back-to-top" onClick={this.scrollToTop}>Back to top</a>
        </Sticky>
      </div>

      <div className="hero-detail-view--center">
        <ul className="hero-detail-view--links">
          <li className="hero-detail-view--link hero-detail-view--link-share"><a onClick={this.toggleShareBox.bind(this)}><i className="fa fa-link"></i> Share</a></li>
          <li className="hero-detail-view--link hero-detail-view--link-reset"><span onClick={this.resetHero}><i className="fa fa-trash-o"></i> Reset</span></li>
        </ul>

        {shareBox}

        <div className="hero-detail-view--skills">
          <SkillBox hero={hero} skillId="Skill1" selectedSkills={selectedSkills} />
          <SkillBox hero={hero} skillId="Skill2" selectedSkills={selectedSkills} />
          <SkillBox hero={hero} skillId="Skill3" selectedSkills={selectedSkills} />
          <SkillBox hero={hero} skillId="Skill4" selectedSkills={selectedSkills} />
          <SkillBox hero={hero} skillId="Focus" selectedSkills={selectedSkills} />
        </div>

        <div className="hero-detail-view--talents">
          {talentBoxes}
        </div>

        <SkinBox skins={hero.skins} />

      </div>
    </div>)
  }

  _renderTalentBoxes(selectedTalents) {
    let talents = this.props.hero.talents;
    let returnValue = []
    let counter = 0;
    for (let key in talents) {
      if (talents.hasOwnProperty(key)) {
        // let label = "level "+key;
        let label = "Talents";
        returnValue.push(<TalentBox talent={talents[key]} talentIndex={counter} level={parseInt(key)} label={label} selectedTalents={selectedTalents} />);
        counter++
      }
    }
    return returnValue
  }

}
