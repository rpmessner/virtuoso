import React, { Component } from 'react';
import { connect } from 'react-redux';
import tonal, { chord } from 'tonal';
import _ from 'lodash';

import { selectChordInversion, selectChordStringSet, selectChordQuality } from '../Actions';
import { stringSetTypes } from '../Music';

const chordQualities = {
  'm7'    : 'Minor 7',
  'm7b5'  : 'Half-Diminished 7',
  'o7'    : 'Diminished 7',
  'mMaj7' : 'Minor-Major 7',
  'Maj7'  : 'Major 7',
  '7'     : 'Dominant 7',
};

class ChordSelector extends Component {
  render() {
    return <div className="chord-selector">
      <ul className="chord-quality">{
        _.map(
          chordQualities, 
            (value, key) => <li onClick={this.props.selectQuality.bind(null, key)}
                                key={key}>{value}</li>
        )
      }</ul>

      <ul className="string-set">{
        _.map(
          stringSetTypes,
          (value, key) => <li onClick={this.props.selectStringSet.bind(null, key)}
                              key={key}>{value}</li>
        )
      }</ul>

      <ul className="string-set">{
        _.map(
          [['Root', 0], ['1st', 1], ['2nd', 2], ['3rd', 3]],
          ([name, inversion]) => <li onClick={this.props.selectInversion.bind(null, inversion)}
                                     key={inversion}>{name}</li>
        )
      }</ul>
    </div>;
  }
}

function mapStateToProps(state) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    selectQuality(chordQuality) {
      dispatch(selectChordQuality(chordQuality));
    },

    selectStringSet(stringSet) {
      dispatch(selectChordStringSet(stringSet));
    },

    selectInversion(inversion) {
      dispatch(selectChordInversion(inversion));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChordSelector);
