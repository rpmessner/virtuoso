export const Types = {
  ADD_STRINGS: 'ADD_STRINGS',
  SET_FRETS: 'SET_FRETS',

  SELECT_NOTE: 'SELECT_NOTE',
  DESELECT_NOTE: 'DESELECT_NOTE',

  CLEAR_NOTES: 'CLEAR_NOTES',

  SELECT_CHORD_STRING_SET: 'SELECT_CHORD_STRING_SET',
  SELECT_CHORD_QUALITY: 'SELECT_CHORD_QUALITY',
  SELECT_CHORD_FRET: 'SELECT_CHORD_ROOT_FRET',
  SELECT_CHORD_INVERSION: 'SELECT_CHORD_INVERSION',
}

export const selectChordInversion = (inversion) => {
  return { type: Types.SELECT_CHORD_INVERSION, inversion }
}

export const selectChordRoot = (fret) => {
  return { type: Types.SELECT_CHORD_FRET, fret }
}

export const selectChordQuality = (quality) => {
  return { type: Types.SELECT_CHORD_QUALITY, quality }
}

export const clearNotes = () => {
  return { type: Types.CLEAR_NOTES }
}

export const selectChordStringSet = (stringSet) => {
  return { type: Types.SELECT_CHORD_STRING_SET, stringSet }
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


