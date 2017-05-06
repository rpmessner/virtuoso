export const Types = {
  ADD_STRINGS: 'ADD_STRINGS',
  SET_FRETS: 'SET_FRETS',
  SELECT_NOTE: 'SELECT_NOTE',
  DESELECT_NOTE: 'DESELECT_NOTE',
}

export const addStrings = (notes=[]) => {
  return {
    type: Types.ADD_STRINGS, 
    notes
  };
}

export const selectNote = (note, string, fret) => {
  return {
    type: Types.SELECT_NOTE,
    note: {
      note, string, fret
    }
  }
}

export const deselectNote = (note, string, fret) => {
  return {
    type: Types.DESELECT_NOTE,
    note: {
      note, string, fret
    }
  }
}

export const setFrets = (frets=12) => {
  return {
    type: Types.SET_FRETS, 
    frets
  };
}


