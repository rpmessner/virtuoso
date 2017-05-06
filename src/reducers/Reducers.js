import _ from 'lodash';

import { isNoteEqual, findNote } from '../Music';
import { Types } from '../Actions';
import { InitialState } from '../Defaults';

export function notes(state = InitialState.notes, action) {
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

  return retval;
}

export function strings(state = InitialState.strings, action) {
  return state;
}

export function frets(state = InitialState.frets, action) {
  switch (action.type) {
    case Types.SET_FRETS:
      return action.frets
    default: return state;
  }
}

export function chord(state = InitialState.chord, action) {
  let retval = state;

  switch (action.type) {
    case Types.SELECT_CHORD_INVERSION:
      retval = _.merge({}, state, { inversion: action.inversion });
      break;
    case Types.SELECT_CHORD_FRET:
      retval = _.merge({}, state, { root: action.fret });
      break;
    case Types.SELECT_CHORD_QUALITY:
      retval =_.merge({}, state, { quality: action.quality });
      break;
    case Types.SELECT_CHORD_STRING_SET:
      retval =_.merge({}, state, { stringSet: action.stringSet });
      break;
  }
  console.log(retval);
  return retval;
}


