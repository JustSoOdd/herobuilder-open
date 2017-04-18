import React from 'react';

// Layout Views
import Header from './Header.react';
import HeroListView from './HeroListView.react';
import HeroDetailView from './HeroDetailView.react';

// Stores
import HeroBuilderStore from '../stores/HeroBuilderStore';

// Actions
import HeroBuilderActions from '../actions/HeroBuilderActions';

// Constants
import ViewConstants from '../constants/ViewConstants';

// Router
import Router from '../helpers/Router';

function getHeroBuilderState() {
  return {
    heroes: HeroBuilderStore.getAllHeroes(),
    patch: HeroBuilderStore.getPatch(),
    currentView: HeroBuilderStore.getCurrentView(),
    activeHero: HeroBuilderStore.getActiveHero(),
    selectedSkills: HeroBuilderStore.getSelectedSkillsForCurrentHero(),
    selectedTalents: HeroBuilderStore.getSelectedTalentsForCurrentHero(),
    shareBoxState: HeroBuilderStore.getShareBoxState()
  };
}

export default class HeroBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = getHeroBuilderState();
    this.router = null;
    this.switchToHero = this.switchToHero.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    HeroBuilderStore.addChangeListener(this._onChange.bind(this));

    // Setup Router
    Router.on('/', function() {
      HeroBuilderActions.changeView(ViewConstants.HERO_SELECT);
    });

    Router.on('/:heroName', this.switchToHero);
    Router.on('/:heroName/:hashId', this.switchToHero);

    // Router initialisation
    if (Router.init) {
      Router.init();
    }
  }

  componentDidUnmount() {
    HeroBuilderStore.removeChangeListener(this._onChange);
  }

  switchToHero(heroName, skillHash) {

    // check if hero exists, if yes, select it
    let hero = this.state.heroes.filter((el) => {
      return el.shortName.toLowerCase() === heroName.toLowerCase();
    });

    if (hero.length) {
      HeroBuilderActions.heroSelected(hero[0]);
    }

    if (skillHash && (skillHash.length === 9 || skillHash.length === 10)) {
      HeroBuilderActions.loadBuild(skillHash);
    }
  }

  /**
   * Gets called when something changes
   */
  _onChange() {
    this.setState(getHeroBuilderState());
  }

  /** Render the component **/
  render() {
    var viewComponent = '';

    switch (this.state.currentView) {
      case ViewConstants.HERO_SELECT:
        viewComponent = <HeroListView heroes={this.state.heroes} />
        break;

      case ViewConstants.SKILL_SELECT:
        viewComponent = <HeroDetailView hero={this.state.activeHero} selectedSkills={this.state.selectedSkills} selectedTalents={this.state.selectedTalents} shareBoxState={this.state.shareBoxState} />
        break;
    }

    return (<div>
      <Header patch={this.state.patch} />
      {viewComponent}
    </div>)
  }

}
