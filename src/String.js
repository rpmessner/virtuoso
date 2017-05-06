import React, { Component } from 'react';
import { connect } from 'react-redux';
import { transpose, note } from 'tonal';
import _ from 'lodash';

import { selectNote, deselectNote, Types } from './Actions';
import { isNoteEqual, findNote } from './Util';

const isNoteSelected = (notes, note, fret, string) => {
  return !_.isNil(findNote(notes, {note, fret, string}));
}

const frets = ({notes, openNote, frets}, selectFret) => {
  const retval = [];
  let oneFretUp = transpose('m2');
  let currentNote = openNote;

  for (var i = 0; i <= frets; i++) {
    retval.unshift(
      <Fret key={i} 
            fret={i} 
            selected={isNoteSelected(notes, currentNote, i, openNote)}
            selectFret={selectFret(currentNote, i, openNote)}
            note={currentNote}/>);

    currentNote = note.simplify(oneFretUp(currentNote));
  }

  return retval.reverse();
}

class Fret extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  onClick() {
    this.props.selectFret(this.props.fret);
  }

  selectedClass() {
    return this.props.selected ? "selected" : "";
  }

  render() {
    return <div onClick={this.onClick.bind(this)}
                className={"fret " + this.selectedClass() }>
      {this.props.note}
    </div>;
  }
}

class String extends Component {
  selectFret(note, fret) {
    return () => {
      let openNote = this.props.openNote,
          currentlySelected = _.find(this.props.notes, (n) => {
            return n.string === openNote;
          });

      if (currentlySelected) {
        this.props.deselectNote(
          currentlySelected.note,
          currentlySelected.string,
          currentlySelected.fret
        );
      }

      if (!isNoteEqual(currentlySelected || {}, {note, string: openNote, fret})) {
        this.props.selectNote(note, openNote, fret);
      }
    }
  }

  render() {
    return <div className="string">
      {frets(this.props, this.selectFret.bind(this))}
    </div>;
  }
}

function mapStateToProps(state) {
  return { frets: state.frets, notes: state.notes };
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
)(String);
