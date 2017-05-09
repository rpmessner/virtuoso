import React, { Component } from 'react';

import ChordDetector from '../containers/ChordDetector';
import ChordDetectNeck from '../containers/ChordDetectNeck';

export default class ChordDetect extends Component {
  render() {
    return (
      <div className="chord-detect">
        <ChordDetector />
        <ChordDetectNeck />
      </div>
    );
  }
}
