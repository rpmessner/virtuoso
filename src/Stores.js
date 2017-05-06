import _ from 'lodash';
import { createStore, combineReducers } from 'redux';

import { isNoteEqual, findNote } from './Util';
import { Types } from './Actions';

const InitialState = {
  strings: ['E2','A2','D3','G3','B4','E4'],
  frets: 21,
  notes: []
};

function notes(state = InitialState.notes, action) {
  let found, note = action.note, retval = state;

  switch (action.type) {
    case Types.SELECT_NOTE:
      found = findNote(state, note);

      if (!found) {
        retval = _.union(state, [note]);
      }
      break;
    case Types.DESELECT_NOTE:
      found = findNote(state, note);

      if (found) {
        let isEqualToFound = isNoteEqual.bind(null, found);

        retval = _.filter(state, _.negate(isEqualToFound));
      }
      break;
  }

  console.log('notes changing: ', retval)

  return retval;
}

function strings(state = InitialState.strings, action) {
  return state;
}

function frets(state = InitialState.frets, action) {
  switch (action.type) {
    case Types.SET_FRETS:
      return action.frets
    default: return state;
  }
}

let reducer = combineReducers({strings, frets, notes});

export default createStore(reducer, InitialState);

