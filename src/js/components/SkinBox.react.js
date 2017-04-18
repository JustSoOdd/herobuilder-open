import React from 'react';
import L from '../helpers/l10n';

import SkinType from './SkinType.react'

export default class SkinBox extends React.Component {
  static propTypes = {
    skins: React.PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.props = props;

    this._renderSkinTypes = this._renderSkinTypes.bind(this);
  }

  _renderSkinTypes() {
    return this.props.skins.map( (skin, index) => {
        if (skin.heroSkins !== null && index < 1 ){ // TODO: Remove index < 1
          return <SkinType skin={skin} key={index}/>
        }        
    })
  }

  render() {
    let skinTypes = this._renderSkinTypes();
    let skins = this.props.skins;
    return (
      <div className="skin-box">
        <h3 className="skin-box--key">Skins</h3>
        <div className="skin-box--inner">
          {skinTypes}
        </div>
      </div>);
  }

}
