import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import DisplayString from './DisplayString';
import { getChordNotes } from '../Music';

class DisplayNeck extends Component {
  render() {
    let selectedNotes = getChordNotes(this.props).reverse();
    let reversedStrings = [...this.props.strings].reverse();

    return <div className="neck">{
      reversedStrings.map(
        (note, i) => <DisplayString key={note}
                                    index={i}
                                    selectedNote={selectedNotes[i]}
                                    openNote={note} /> 
      )
    }</div>;
  }
}

function mapStateToProps(state) {
  return {
    frets: state.frets,
    chord: state.chord,
    strings: state.strings
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayNeck);
