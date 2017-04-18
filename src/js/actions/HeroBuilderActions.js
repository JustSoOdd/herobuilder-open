import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionConstants from '../constants/ActionConstants';

class HeroBuilderActions {
  /**
   * Gets called when a hero is selected
   * @param {object} hero
   * @returns {void}
   */
  static heroSelected(hero) {
    AppDispatcher.dispatch({
      actionType: ActionConstants.HERO_SELECTED,
      hero: hero
    });
  }

  /**
   * Gets called when a hero is removed, either from team
   * or solo.
   * @param {object} hero
   */
  static removeHero(hero) {
    AppDispatcher.dispatch({
      actionType: ActionConstants.HERO_REMOVED,
      hero: hero
    });
  }

  /**
   * Called when heros build should be reset
   * @param {object} hero
   */
  static resetHero(hero) {
    AppDispatcher.dispatch({
      actionType: ActionConstants.HERO_RESET_BUILD,
      hero: hero
    });
  }

  /**
   * Selects a given skill by id for hero
   * @param {number} skillId
   * @param {object} hero
   */
  static selectSkillForActiveHero(skillId, skillPath) {
    AppDispatcher.dispatch({
      actionType: ActionConstants.HERO_SKILL_SELECTED,
      skillId: skillId,
      skillPath: skillPath
    });
  }

  /**
   * Selects a given talent by index for hero
   * @param {number} level
   * @param {number} skillIndex
   */
  static selectTalentForActiveHero(level, skillIndex) {
    AppDispatcher.dispatch({
      actionType: ActionConstants.HERO_TALENT_SELECTED,
      level: level,
      skillIndex: skillIndex
    });
  }

  /**
   * Loads a given build
   * @param {string} skillHash
   */
  static loadBuild(skillHash) {
    AppDispatcher.dispatch({
      actionType: ActionConstants.HERO_LOAD_BUILD,
      skillHash: skillHash
    })
  }

  /**
   * Called when the application did mount
   */
  static applicationLoaded() {
    AppDispatcher.dispatch({
      actionType: ActionConstants.APP_LOADED
    });
  }

  /**
   * Called by router to change Views
   */
  static changeView(view) {
    AppDispatcher.dispatch({
      actionType: ActionConstants.CHANGE_VIEW,
      view: view
    });
  }

  /**
   * Called by component to change language
   */
  static changeLanguage(language) {
    AppDispatcher.dispatch({
      actionType: ActionConstants.CHANGE_LANGUAGE,
      language: language
    });
  }

  /**
   *
   */
  static toggleShareBox() {
    AppDispatcher.dispatch({
      actionType: ActionConstants.TOGGLE_SHARE_BOX
    });
  }
};

export default HeroBuilderActions;
