/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React from 'react';
import HeroBuilder from './js/components/HeroBuilder.react';

var css = require('./main.scss');

export default class Application extends React.Component {

  render() {
    return (
      <div>
        {css}
        <HeroBuilder heroesSource="giganticData.json" />
      </div>
    );
  }

};
