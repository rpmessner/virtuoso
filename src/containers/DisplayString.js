import React, { Component } from 'react';
import { connect } from 'react-redux';
import { transpose, note } from 'tonal';
import { selectChordRoot } from '../Actions';
import { getRootFret, isNoteEqual, findNote } from '../Music';

import Fret from '../components/Fret'

const getFretDistances = (numFrets, length) => {
	var retval = [0];

	for (var i = 1; i <= numFrets; i++) {
		retval[i] = length - (length / Math.pow(2, (i / 12)));
		retval[i] = (Math.round(retval[i] * 1000) / 1000) * 1.35;
	}

  return retval;
}

const frets = ({selectedNote, notes, index, strings, chord, openNote, frets, selectChordRoot}) => {
  const retval = [],
        oneFretUp = transpose('m2');
  let currentNote = openNote;
  let fretDistances = getFretDistances(frets, 100);

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
            width={i == 0 ? fretDistances[1] : fretDistances[i] - fretDistances[i-1]}
            left={fretDistances[i]}
            selected={isFretSelected}
            selectedNote={selectedNote}
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
