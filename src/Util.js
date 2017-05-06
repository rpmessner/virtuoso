import _ from 'lodash';

export const isNoteEqual = (note, n) => {
  return n.note === note.note 
    && n.string === note.string
    && n.fret === note.fret;
}

export const findNote = (notes, note) => {
  return _.find(notes, isNoteEqual.bind(null, note));
}
