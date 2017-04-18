import EventEmitter from 'events';

// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';

// Constants
import ActionConstants from '../constants/ActionConstants';
import LanguageConstants from '../constants/LanguageConstants';
import ViewConstants from '../constants/ViewConstants';

import HashBuilder from '../helpers/HashBuilder';
import Storage from '../helpers/Storage';

// Static Data
import GiganticData from '!json!../../giganticData-Live-2017-03-01_14-23-14.json';

/**
 *
 */
var _selectedHeroes = [];

var _selectedSkills = new WeakMap();

var _selectedTalents = new WeakMap();

var _activeHero = null;

//unused: var _currentControlScheme = '';

var _currentLanguage = Storage.getItem('language') || LanguageConstants.EN;

var _availableHeroes = GiganticData['heroes'];

var _availablePatch = GiganticData['patch'];

var _currentView = ViewConstants.HERO_SELECT;

var _shareBoxActive = false;

var _teamMode = false;

const CHANGE_EVENT = 'change';


/**
 * HeroBuilderStore
 * @extends EventEmitter.prototype
 */
var HeroBuilderStore = Object.assign({}, EventEmitter.prototype, {

  /**
   * @returns {string}
   */
  getAllHeroes: function() {
    return _availableHeroes;
  },
  /**
   * @returns {string}
   */
  getPatch: function() {
    return _availablePatch;
  },

  /**
   * @returns {string}
   */
  getTeamModeEnabled: function() {
    return _teamMode;
  },

  /**
   * @returns {string}
   */
  getShareBoxState: function() {
    return _shareBoxActive;
  },

  /**
   * @returns {object}
   */
  getActiveHero: function() {
    return _activeHero;
  },

  /**
   * @returns {string}
   */
  getCurrentLanguage: function() {
    return _currentLanguage;
  },

  /**
   * @returns {array}
   */
  getSelectedSkillsForCurrentHero: function() {
    if (!_activeHero) {
      return [];
    }
    return _selectedSkills.get(_activeHero);
  },

  /**
   * @returns {array}
   */
  getSelectedTalentsForCurrentHero: function() {
    if (!_activeHero) {
      return {
        3: null,
        5: null,
        7: null,
        9: null
      };
    }
    return _selectedTalents.get(_activeHero);
  },

  /**
   * @returns {string}
   */
  getCurrentView: function() {
    return _currentView;
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


/**
 * Array Equals Method
 */
function arraysEqual(a, b) {
  var i;

  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

/**
 *
 */
function heroSelected(hero) {
  _activeHero = hero;

  if (!_teamMode) {
    _selectedHeroes = [];
  }

  // Check if hero is already in selection
  if (_selectedHeroes.indexOf(hero) > -1) {
    // he is, do nothing
  } else if (_selectedHeroes.length < 5) {
    // he is not, push him into the array
    _selectedHeroes.push(hero);
    _selectedSkills.set(hero, []);
    _selectedTalents.set(hero, {
      '3': null,
      '5': null,
      '7': null,
      '9': null
    });
  }

  _currentView = ViewConstants.SKILL_SELECT;
  HeroBuilderStore.emit(CHANGE_EVENT);
}

/**
 *
 */
function heroRemoved(hero) {
  if (_selectedHeroes.indexOf(hero)>-1) {
    _selectedHeroes.splice(_selectedHeroes.indexOf(hero), 1);
  }
}

/**
 * Resets given hero
 * @param {object} hero
 */
function resetHeroBuild(hero) {
  _shareBoxActive = false;
  _selectedSkills.set(hero, []);
  _selectedTalents.set(hero, []);
  HeroBuilderStore.emit(CHANGE_EVENT);
}

/**
 *
 */
function setView(view) {
  _currentView = view;
  HeroBuilderStore.emit(CHANGE_EVENT);
}

/**
 * Toggles the share box on the hero detail view
 */
function toggleShareBox() {
  _shareBoxActive = !_shareBoxActive;
  HeroBuilderStore.emit(CHANGE_EVENT);
}

/**
 * Changes language to given language and
 * persists choice in local storage
 * @param {string} language
 */
function changeLanguage(language) {
  _currentLanguage = language;
  Storage.setItem('language', language);
  HeroBuilderStore.emit(CHANGE_EVENT);
}

/**
 * Selects a skill for the given hero
 * @param {number} skillId
 * @param {string} skillPath
 */
function skillSelected(skillId, skillPath) {
  var targetIndex, targetSkills;

  var skills = _selectedSkills.get(_activeHero);

  // Skill is last skill selected, deselect
  if (skills.length && arraysEqual(skills[skills.length-1], [skillId, skillPath])) {
    skills.pop();
  } else {
    targetIndex = -1;

    // Check if skill needs swapping
    targetSkills = skills.filter(function(skill, index) {
      if (skill[0] === skillId) {
        targetIndex = index;
        return true;
      }
      return false;
    });

    if (targetSkills.length === skillPath.length) {
      skills[targetIndex][1] = skillPath;
    } else {
      skills = skills.concat([[skillId, skillPath]]);
    }
  }

  _selectedSkills.set(_activeHero, skills);

  updateHash();

  HeroBuilderStore.emit(CHANGE_EVENT);
}

function talentSelected(level, talentIndex) {
  var talents = _selectedTalents.get(_activeHero);
  talents[level] = talentIndex;
  _selectedTalents.set(_activeHero, talents);

  updateHash();

  HeroBuilderStore.emit(CHANGE_EVENT);
}

function updateHash() {
  var skills = _selectedSkills.get(_activeHero);
  var talents = _selectedTalents.get(_activeHero);

  var newHash = HashBuilder.create(skills, talents);
  window.history.pushState({}, '', '/' + _activeHero.shortName + '/' + newHash);
}

/**
 * Loads a given build for active hero
 * @param {string} skillHash
 */
function loadBuild(skillHash) {
  var res = HashBuilder.unpack(skillHash);

  _selectedSkills.set(_activeHero, res.skills);
  _selectedTalents.set(_activeHero, res.talents);

  HeroBuilderStore.emit(CHANGE_EVENT);
}

/**
 * Register to the AppDispatcher
 */
AppDispatcher.register(function(evt) {

  switch(evt.actionType) {
    case ActionConstants.HERO_SELECTED:
      heroSelected(evt.hero);
      break;

    case ActionConstants.HERO_REMOVED:
      heroRemoved(evt.hero);
      break;

    case ActionConstants.HERO_RESET_BUILD:
      resetHeroBuild(evt.hero);
      break;

    case ActionConstants.HERO_LOAD_BUILD:
      loadBuild(evt.skillHash);
      break;

    case ActionConstants.HERO_SKILL_SELECTED:
      skillSelected(evt.skillId, evt.skillPath);
      break;

    case ActionConstants.HERO_TALENT_SELECTED:
      talentSelected(evt.level, evt.skillIndex);
      break;

    case ActionConstants.TOGGLE_SHARE_BOX:
      toggleShareBox();
      break;

    case ActionConstants.CHANGE_VIEW:
      setView(evt.view);
      break;

    case ActionConstants.CHANGE_LANGUAGE:
      changeLanguage(evt.language);
      break;
  }

});

export default HeroBuilderStore;
