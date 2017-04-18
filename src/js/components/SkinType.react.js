import React from 'react';;
import L from '../helpers/l10n';

import SkinPortrait from './SkinPortrait.react'

export default class SkinType extends React.Component {
  static propTypes = {
    skin: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.props = props;

    this._renderSkinPortraits = this._renderSkinPortraits.bind(this)
    this._renderDefaultHeroSkin = this._renderDefaultHeroSkin.bind(this)
  }

  _renderSkinPortraits() {
    if (this.props.skin.heroSkins !== null) {
      return this.props.skin.heroSkins.map( (heroSkin, index) => {
        if (index > 0) {
          return <SkinPortrait skinId={this.props.skin.id} skin={heroSkin} key={index}/>
        } else {
          return '';
        }
      })
    } else {
      return  ""
    }

  }

  _renderDefaultHeroSkin() {
    let heroSkins = this.props.skin.heroSkins;
    if(heroSkins !== null) {
      if (heroSkins.length === 1) {
        return  <SkinPortrait skinId={this.props.skin.id} skin={heroSkins[0]} key={0} />
      } else if (heroSkins.length > 1) {
        // return (
        //   <div className="skin-box--skin-default">
        //     <SkinPortrait skinId={this.props.skin.id} skin={heroSkins[0]} key={0} />
        //     <i className="fa fa-caret-right skin-box--skin--arrow"></i>
        //   </div>
        // )
         //TODO: Uncomment above lines
        //TODO: Remove lines below when skin images are back
        return (
          <div className="skin-box--skin-default">
            <SkinPortrait skinId={this.props.skin.id} skin={heroSkins[0]} key={0} />
          </div>
        )
      }
    } else {
      return ""
    }
  }

  render() {
    let defaultSkin = this._renderDefaultHeroSkin();
    let colourVariants = this._renderSkinPortraits();
    // return (
    //   <div className="skin-box--skin">
    //     {defaultSkin}
    //     {colourVariants}
    //   </div>);

    //TODO: Uncomment above lines
    //TODO: Remove lines below when skin images are back
    return (
      <div className="skin-box--skin">
        {defaultSkin}
      </div>);
  }

}
