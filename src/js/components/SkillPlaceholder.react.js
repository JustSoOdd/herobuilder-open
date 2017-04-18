import React from 'react';

// Helpers
import L from '../helpers/l10n';

export default class SkillPlaceholder extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (<div className="skill-icon">
      <div className="skill-icon--image-wrapper">
        <div className="skill-icon--image-placeholder">?</div>
      </div>
      <div className="skill-icon--name">Select a skill</div>
    </div>)
  }
}
