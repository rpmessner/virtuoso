import React, { Component } from 'react';

import ChordSelector from '../containers/ChordSelector';
import DisplayNeck from '../containers/DisplayNeck';

class ChordSelect extends Component {
  render() {
    return (<div className="chord-select">
        <DisplayNeck />
        <ChordSelector />
      </div>
    )
  }
}

export default ChordSelect;
