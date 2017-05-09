import React, { Component } from 'react';
import { transpose, note } from 'tonal';
import _ from 'lodash';

import Fret from '../components/Fret';
import String from '../components/String';

import { getFretDistances } from '../Music';

const frets = ({selectedNote, openNote, frets, getNote}) => {
  const retval = [],
        oneFretUp = transpose('m2');

  let currentNote = openNote;
  let fretDistances = getFretDistances(frets, 100);

  for (var i = 0; i <= frets; i++) {
    retval.push(
      <Fret key={i}
            fret={i}
            width={fretDistances[i]}>
        {getNote(openNote, selectedNote, currentNote, i)}
      </Fret>
    );

    currentNote = note.simplify(oneFretUp(currentNote));
  }

  return retval;
}

export default class Neck extends Component {
  render() {
    let selectedNotes = this.props.selectedNotes;
    let reversedStrings = [...this.props.strings].reverse();

    return <div className="neck">{
      reversedStrings.map(
        (note, i) => <String key={note} index={i}>
          { frets({...this.props, selectedNote:selectedNotes[i], openNote:note}) }
        </String> 
      )
    }</div>;
  }
}
