import React from 'react';

import LanguageConstants from '../constants/LanguageConstants';

import HeroBuilderActions from '../actions/HeroBuilderActions';

export default class LanguageToggle extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.selectLanguage = this.selectLanguage.bind(this);
  }

  selectLanguage(language) {
    HeroBuilderActions.changeLanguage(language);
  }

  render() {
    var items = [];
    var language;

    for (language in LanguageConstants) {
      items.push(<li key={language} className="language-toggle--item" onClick={this.selectLanguage.bind(this, language)}>{language}</li>);
    }

    return (<ul className="language-toggle">
      {items}
    </ul>)
  }
}
