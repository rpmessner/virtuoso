import { Record, Map, Collection } from 'immutable';

const Note_ = Record({name: '', octave: 1});

export function Note(name) {
  return Note_({name});
}

export const String = Record({
  'note': Note('C4')
});

const Chord_ = Record({
  notes: []
})

export function Cord({root, quality}) {
  // switch 
}


const notes = [
  ['A'],
  ['A#','Bb'],
  ['B','Cb'],
  ['B#','C'],
  ['C#','Db'],
  ['D']
  ['D#','Eb'],
  ['E'],
  ['E#','F']
  ['F#','Gb'],
  ['G']
  ['G#','Ab']
];

const inetervals = [
  ['root'],
  ['b2'],
  ['2'],
  ['b3'],
  ['3'],
  ['4'],
  ['#4', 'b5'],
  ['5'],
  ['#5','b6'],
  ['6'],
  ['b7'],
  ['7'],
  ['octave']
]

const noteMatcher = /(G#|Ab|A|A#|Bb|B|Cb|B#|C|C#|Db|D|D#|Eb|E|E#|F|F#|Gb|G)([1-5])?/;
function noteNameToNoteOctave(noteName) {
  let [note, octave] = noteName.match(noteMatcher);
  // return Note(
}

// returns new note
function addIntervalToNote(note, interval) {

}
