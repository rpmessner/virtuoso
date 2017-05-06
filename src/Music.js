import _ from 'lodash';

import tonal from 'tonal';
import { fromSemitones, semitones } from 'tonal-interval';

export const stringSetTypes = {
  // "1|3" : "1st set of 3",
  // "2|3" : "2nd set of 3",
  // "3|3" : "3rd set of 3",
  // "4|3" : "4th set of 3",

  "1|4" : "1st set of 4",
  "2|4" : "2nd set of 4",
  "3|4" : "3rd set of 4",

  // "1|B3" : "1st set of broken 3",
  // "2|B3" : "2nd set of broken 3",
  // "3|B3" : "3rd set of broken 3",

  // "B1|3" : "broken 1st set of 3",
  // "B2|3" : "broken 2nd set of 3",
  // "B3|3" : "broken 3rd set of 3",

  // "1|B4" : "1st set of broken 4",
  // "2|B4" : "2nd set of broken 4",

  // "1|B2" : "1st set of broken 2",
  // "2|B2" : "2nd set of broken 2",
  // "3|B2" : "3rd set of broken 2",
  // "4|B2" : "4th set of broken 2",

  // "A|1" : "1st double broken set of 2",
  // "A|2" : "2nd double broken set of 2",
  // "A|3" : "3rd double broken set of 2",
}

const generalStringSets = {
  "X|4"  : ['1|4',  '2|4',  '3|4'],
  // "X|3"  : ['1|3',  '2|3',  '3|3', '4|3'],
  // "X|B3" : ['1|B3', '2|B3', '3|B3'],
  // "BX|3" : ['B1|3', 'B2|3', 'B3|3'],
  // "X|B4" : ['1|B4', '2|B4'],
  // "X|B2" : ['1|B2', '2|B2', '3|B2', '4|B2'],
  // "A|X"  : ['A|1',  'A|2',  'A|3'],
}


export const stringSetIndices = {
  // "1|3" : [3, 4, 5],
  // "2|3" : [2, 3, 4],
  // "3|3" : [1, 2, 3],
  // "4|3" : [0, 1, 2],

  "1|4" : [2, 3, 4, 5],
  "2|4" : [1, 2, 3, 4],
  "3|4" : [0, 1, 2, 3],

  // "1|B3" : [2, 4, 5],
  // "2|B3" : [1, 3, 4],
  // "3|B3" : [0, 2, 3],

  // "B1|3" : [2, 3, 5],
  // "B2|3" : [1, 2, 4],
  // "B3|3" : [0, 1, 3],

  // "1|B4" : [1, 3, 4, 5],
  // "2|B4" : [0, 2, 3, 4],

  // "1|B2" : [3, 5],
  // "2|B2" : [2, 4],
  // "3|B2" : [1, 3],
  // "4|B2" : [0, 2],

  // "A|1" : [2, 5],
  // "A|2" : [1, 4],
  // "A|3" : [0, 3],
}


// export const stringSetIntervals = _.merge({},
  // "1|3" : stringSetTypeIntervals["X|3"],
  // "2|3" : stringSetTypeIntervals["X|3"],
  // "3|3" : stringSetTypeIntervals["X|3"],
  // "4|3" : stringSetTypeIntervals["X|3"],

  // "1|4" : stringSetTypeIntervals["X|4"],
  // "2|4" : stringSetTypeIntervals["X|4"],
  // "3|4" : stringSetTypeIntervals["X|4"],

  // "1|B3" : stringSetTypeIntervals["X|B3"],
  // "2|B3" : stringSetTypeIntervals["X|B3"],
  // "3|B3" : stringSetTypeIntervals["X|B3"],

  // "B1|3" : stringSetTypeIntervals["BX|3"],
  // "B2|3" : stringSetTypeIntervals["BX|3"],
  // "B3|3" : stringSetTypeIntervals["BX|3"],

  // "1|B4" : stringSetTypeIntervals["X|B4"],
  // "2|B4" : stringSetTypeIntervals["X|B4"],

  // "1|B2" : stringSetTypeIntervals["X|B2"],
  // "2|B2" : stringSetTypeIntervals["X|B2"],
  // "3|B2" : stringSetTypeIntervals["X|B2"],
  // "4|B2" : stringSetTypeIntervals["X|B2"],

  // "A|1" : stringSetTypeIntervals["A|X"],
  // "A|2" : stringSetTypeIntervals["A|X"],
  // "A|3" : stringSetTypeIntervals["A|X"],
// }

export const isNoteEqual = (note, n) => {
  return n.note === note.note 
    && n.string === note.string
    && n.fret === note.fret;
}

export const findNote = (notes, note) => {
  return _.find(notes, isNoteEqual.bind(null, note));
}

export const getChordNotes = ({strings, chord}) => {
  let {stringSet, root, quality} = chord;

  let generalStringSet = getGeneralStringSet(stringSet);
  let intervalInts   = chordQualityIntervals[generalStringSet][quality];
  let intervals      = _.map(intervalInts, fromSemitones);
  let indices        = stringSetIndices[stringSet];
  let rootStringNote = strings[indices[0]];
  let rootNote       = tonal.transpose(rootStringNote, fromSemitones(root));


  let retval = _.reduce(strings, (coll, s, i) => {
    let intervalIndex = _.indexOf(indices, i), next = {};

    if (intervalIndex >= 0) {
      let intervalInt = intervalInts[intervalIndex];
      let interval = intervals[intervalIndex];
      let note = tonal.note.simplify(tonal.transpose(rootNote, interval));
      let fret = semitones(tonal.interval(s, note));
      if (fret < 0) {
       debugger
      }
      next = { note, string: s, fret, };      
    }

    return [...coll, next]
  }, []);

  return retval;
}

const getGeneralStringSet = (stringSet) => {
  return _.reduce(generalStringSets, (coll, value, key) => {
    if (_.includes(value, stringSet)) {
      return key;
    } else return coll
  }, "");
}

const chordQualityIntervals = {
  "X|4" : {
    'm7'    : [0, 7, 10, 15],
    'm7b5'  : [0, 6, 10, 15],
    'o7'    : [0, 6, 9, 15],
    'mMaj7' : [0, 7, 11, 15],
    'Maj7'  : [0, 7, 11, 16],
    '7'     : [0, 7, 10, 16],
  }
}
