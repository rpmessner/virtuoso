import React, { Component } from 'react';

import ChordSelector from '../containers/ChordSelector';
import ChordSelectNeck from '../containers/ChordSelectNeck';

class ChordSelect extends Component {
  render() {
    return (<div className="chord-select">
        <ChordSelector />
        <ChordSelectNeck />
      </div>
    )
  }
}

export default ChordSelect;
