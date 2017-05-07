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

  "1|B4" : "1st set of broken 4",
  "2|B4" : "2nd set of broken 4",

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
  "X|B4" : ['1|B4', '2|B4'],
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

  "1|B4" : [1, 3, 4, 5],
  "2|B4" : [0, 2, 3, 4],

  // "1|B2" : [3, 5],
  // "2|B2" : [2, 4],
  // "3|B2" : [1, 3],
  // "4|B2" : [0, 2],

  // "A|1" : [2, 5],
  // "A|2" : [1, 4],
  // "A|3" : [0, 3],
}

const chordQualityIntervals = {
  "X|4" : {
    'm7'    : [[0, 7, 10, 15], [3, 10, 12, 19], [7, 12, 15, 22], [10, 15, 19, 24]],
    'm7b5'  : [[0, 6, 10, 15], [3, 10, 12, 18], [6, 12, 15, 22], [10, 15, 18, 24]],
    'o7'    : [[0, 6, 9,  15], [3, 9,  12, 18], [6, 12, 15, 21], [9,  15, 18, 24]],
    'mMaj7' : [[0, 7, 11, 15], [3, 11, 12, 19], [7, 12, 15, 23], [11, 15, 19, 24]],
    'Maj7'  : [[0, 7, 11, 16], [4, 11, 12, 19], [7, 12, 16, 23], [11, 16, 19, 24]],
    '7'     : [[0, 7, 10, 16], [4, 10, 12, 19], [7, 12, 16, 22], [10, 16, 19, 24]],
  },
  "X|B4" : {
    'm7'    : [[0, 10, 15, 19], [3, 12, 19, 22], [7, 15, 22, 24], [10, 19, 24, 27]],
    'm7b5'  : [[0, 10, 15, 18], [3, 12, 18, 22], [6, 15, 22, 24], [10, 18, 24, 27]],
    'o7'    : [[0, 9,  15, 18], [3, 12, 18, 21], [6, 15, 21, 24], [9,  18, 24, 27]],
    'mMaj7' : [[0, 11, 15, 19], [3, 12, 19, 23], [7, 15, 23, 24], [11, 19, 24, 27]],
    'Maj7'  : [[0, 11, 16, 19], [4, 12, 19, 23], [7, 16, 23, 24], [11, 19, 24, 28]],
    '7'     : [[0, 10, 16, 19], [4, 12, 19, 22], [7, 16, 22, 24], [10, 19, 24, 28]],
  }
}

export const isNoteEqual = (note, n) => {
  return n.note === note.note 
    && n.string === note.string
    && n.fret === note.fret;
}

export const findNote = (notes, note) => {
  return _.find(notes, isNoteEqual.bind(null, note));
}

export const getChordNotes = ({strings, chord}) => {
  let {stringSet, root, quality, inversion} = chord;

  let generalStringSet = getGeneralStringSet(stringSet);
  let intervalInts   = chordQualityIntervals[generalStringSet][quality][inversion];
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

export const getRootFret = (selectedFret, strings, chord) => {
  let genStrSet = getGeneralStringSet(chord.stringSet);
  let intervals = chordQualityIntervals[genStrSet][chord.quality][chord.inversion];
  let chordNotes = getChordNotes({strings, chord});
  let root = _.find(intervals, (i) => i % 12 === 0);
  let rootStringIndex = stringSetIndices[chord.stringSet][_.indexOf(intervals, root)]
  let stringRoot = strings[rootStringIndex]
  let rootChordNote = _.find(chordNotes, (n) => n.string === stringRoot);
  let bassChordNote = _.find(chordNotes, (n) => !_.isNil(n.string));
  return selectedFret - intervals[0] + (bassChordNote.fret - rootChordNote.fret);
}
