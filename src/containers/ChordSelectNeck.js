import React, { Component } from 'react';
import { connect } from 'react-redux';
import { interval } from 'tonal';

import Note from '../components/Note';
import Neck from '../components/Neck';

import { selectChordRoot } from '../Actions';
import { getChordNotes } from '../Music';

class ChordSelectNeck extends Component {
  getNote(open, note, pitch, fret) {
    let onClick = this.props.selectChordRoot.bind(null, pitch), 
        isSelected = false;

    if (note.string === open
        && pitch === note.note
        && note.fret === fret) {
      isSelected = true;
    }

    return <Note note={note}
                 pitch={pitch}
                 onClick={onClick}
                 interval={interval(this.props.chord.root, pitch)}
                 selected={isSelected}/>;
  }

  render() {
    let selectedNotes = getChordNotes(this.props).reverse();

    return <Neck strings={this.props.strings}
                 frets={this.props.frets}
                 selectedNotes={selectedNotes}
                 getNote={this.getNote.bind(this)}/>;
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
    selectChordRoot(pitch) {
      dispatch(selectChordRoot(pitch));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChordSelectNeck);

