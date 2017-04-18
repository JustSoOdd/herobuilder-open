import React from 'react';

import LanguageToggle from './LanguageToggle.react';

import Link from './Link.react';

export default class Header {

  render() {
    return (
      <header className="header">
        <Link href={'/'} className="header__navigation-backlink">&#8592; Back</Link>
        <a href="http://www.ggunleashed.com"><img className="header__navigation-logo" src="/gguwhite.png" alt="GGUnleashed logo" /></a>
        <input type="checkbox" className="header__toggle" id="header__toggle" />
        <label className="header__menu-toggle" htmlFor="header__toggle">Menu</label>
        <ul className="header__navigation" role="menu">
          <li className="header__navigation-item">
            <a href="http://www.ggunleashed.com" className="header__navigation-item-link">Home</a>
          </li>
          <li className="header__navigation-item">
            <a href="http://articles.ggunleashed.com/" className="header__navigation-item-link">Articles</a>
          </li>
          <li className="header__navigation-item">
            <Link href={'/'} className="header__navigation-item-link">Hero Builder</Link>
          </li>
          <li className="header__navigation-item">
            <a href="https://twitter.com/GG_Unleashed" className="header__navigation-item-link"><i className="fa fa-twitter"></i></a>
          </li>
          <li className="header__navigation-item">
            <a href="https://www.facebook.com/ggunleashed" className="header__navigation-item-link"><i className="fa fa-facebook"></i></a>
          </li>
          <li className="header__navigation-item">
            <a href="https://twitch.tv/ggunleashed" className="header__navigation-item-link"><i className="fa fa-twitch"></i></a>
          </li>
        </ul>
        <div className="header__reverse-row">
          <span className="header__patch" title={ "Current Patch: " + this.props.patch}>
            { this.props.patch }
          </span>
          <LanguageToggle />
        </div>
      </header>
    );
  }

}
