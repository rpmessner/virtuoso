import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const inversionTypes = [['Root', 0], ['1st', 1], ['2nd', 2], ['3rd', 3]];

class ChordSelector extends Component {
  selectedClass(field, current) {
    return this.props.chord[field] === current ? 'selected':''
  }
  render() {
    return <fieldset className="chord-selector controls">
      <div className="info">Root Note: {this.props.chord.root}</div>
      <div className="dropdown">
        <ul className="chord-quality">
          <li>Chord Quality: {this.props.chord.quality}</li>{
          _.map(
            chordQualities, 
              (value, key) => <li onClick={this.props.selectQuality.bind(null, key)}
                                  className={this.selectedClass('quality', key)}
                                  key={key}>{value}</li>
          )
        }</ul>
      </div>
      <div className="dropdown">
        <ul className="string-set">
          <li>String Set: {this.props.chord.stringSet}</li>{
          _.map(
            stringSetTypes,
            (value, key) => <li onClick={this.props.selectStringSet.bind(null, key)}
                                className={this.selectedClass('stringSet', key)}
                                key={key}>{value}</li>
          )
        }</ul>
      </div>
      <div className="dropdown">
        <ul className="inversion">
          <li>Inversion: {this.props.chord.inversion}</li>{
          _.map(
            inversionTypes,
            ([name, val]) => <li onClick={this.props.selectInversion.bind(null, val)}
                                 className={this.selectedClass('inversion', val)}
                                 key={val}>{name}</li>
          )
        }</ul>
      </div>
    </fieldset>;
  }
}

function mapStateToProps(state) {
  return { chord: state.chord };
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
