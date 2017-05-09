import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Neck from '../components/Neck';
import Note from '../components/Note';

import { selectNote, deselectNote } from '../Actions';
import { isNoteEqual, findNote } from '../Music';

const isNoteSelected = (notes, note, fret, string) => {
  return !_.isNil(findNote(notes, {note, fret, string}));
}

class ChordDetectNeck extends Component {
  getNote(open, note, pitch, fret) {
    let onClick = this.selectNote.bind(this, open, pitch, fret),
        isSelected = isNoteSelected(this.props.notes, pitch, fret, open);

    return <Note note={note}
                 pitch={pitch}
                 onClick={onClick}
                 selected={isSelected}/>;
  }

  selectNote(open, note, fret) {
    let currentlySelected = _.find(this.props.notes, (n) => {
          return n.string === open;
        });

    if (currentlySelected) {
      this.props.deselectNote(
        currentlySelected.note,
        currentlySelected.string,
        currentlySelected.fret
      );
    }

    if (!isNoteEqual(currentlySelected || {}, {note, string: open, fret})) {
      this.props.selectNote(note, open, fret);
    }
  }

  render() {
    return <Neck strings={this.props.strings}
                 frets={this.props.frets}
                 selectedNotes={this.props.notes}
                 getNote={this.getNote.bind(this)}/>
  }
}

function mapStateToProps(state) {
  return { frets: state.frets, notes: state.notes, strings: state.strings };
}

function mapDispatchToProps(dispatch) {
  return {
    selectNote: function() {
      dispatch(selectNote.apply(null, arguments));
    },
    deselectNote: function() {
      dispatch(deselectNote.apply(null, arguments));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChordDetectNeck);
