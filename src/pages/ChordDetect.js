import React, { Component } from 'react';

import ChordDetector from '../containers/ChordDetector';
import SelectNeck from '../containers/SelectNeck';

export default class ChordDetect extends Component {
  render() {
    return (
      <div className="chord-detect">
        <SelectNeck />
        <ChordDetector />
      </div>
    );
  }
}
