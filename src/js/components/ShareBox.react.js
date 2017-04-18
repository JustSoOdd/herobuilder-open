import React from 'react';
import {FacebookButton, TwitterButton} from 'react-social';
import L from '../helpers/l10n';

export default class ShareBox extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  getShareableLink() {
    return location.href;
  }

  render() {
    var twitterShare = "I made a Gigantic build with the @GG_Unleashed builder #GGUNewBuilder: ";
    var facebookShareText = "I made a Gigantic build with the Gigantic Unleashed builder for " + L(this.props.heroName)+ " #GGUNewBuilder";
    return (<div className="share-box">

      <h3 className="share-box--key">Share</h3>
      <div className="share-box--inner">
        Show your glorious build to your family, friends, pets and the rest of the internet by sharing this URL with them.
        <div className="share-box--link">{this.getShareableLink()}</div>
        <div className="share-box--social">
          <FacebookButton url={this.getShareableLink()} message={facebookShareText}>
            Share on Facebook
          </FacebookButton>
          <TwitterButton url={this.getShareableLink()} message={twitterShare}>
            Share on Twitter
          </TwitterButton>
        </div>
      </div>
    </div>);
  }

}
