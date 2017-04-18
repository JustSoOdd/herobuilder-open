import React from 'react';

// Helpers
import L from '../helpers/l10n';

export default class SkinPortrait extends React.Component {

  static propTypes = {
    skinId: React.PropTypes.string.isRequired,
    skin: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var skin = this.props.skin;
    var skinId = this.props.skinId
    var skinImageClasses = 'skin-portrait--avatar-image Skins_HeroSkin_' + skinId + '_' + skin.colourVariant;

    return (<div className="skin-portrait">
      <div className="skin-portrait--avatar">
        <div className={skinImageClasses} />
      </div>
      <h1 className="skin-portrait--name">{L(skin.name)}</h1>
      <p className="skin-portrait--description tooltip" dangerouslySetInnerHTML={{__html: L(skin.description) }}></p>
    </div>)
  }
}
