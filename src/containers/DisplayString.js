import React, { Component } from 'react';
import { connect } from 'react-redux';
import { transpose, note } from 'tonal';
import { selectChordRoot } from '../Actions';
import { getRootFret, isNoteEqual, findNote } from '../Music';

import Fret from '../components/Fret'

const frets = ({selectedNote, notes, index, strings, chord, openNote, frets, selectChordRoot}) => {
  const retval = [],
        oneFretUp = transpose('m2');
  let currentNote = openNote;

  for (var i = 0; i <= frets; i++) {
    let isFretSelected = false;

    if (selectedNote.string === openNote
        && currentNote === selectedNote.note
        && selectedNote.fret === i) {
      isFretSelected = true;
    }

    retval.push(
      <Fret key={i}
            fret={i}
            selected={isFretSelected}
            selectFret={selectChordRoot.bind(null, i, strings, chord)}
            note={currentNote}/>);

    currentNote = note.simplify(oneFretUp(currentNote));
  }

  return retval;
}

class String extends Component {
  render() {
    return <div className="string">
      {frets(this.props)}
    </div>;
  }
}
String.getDefaultProps = { strings: [], frets: 0, chord: {} }

function mapStateToProps(state) {
  return {
    strings: state.strings,
    frets: state.frets,
    chord: state.chord
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectChordRoot(fret, strings, chord) {
      dispatch(selectChordRoot(getRootFret(fret, strings, chord)));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(String);
