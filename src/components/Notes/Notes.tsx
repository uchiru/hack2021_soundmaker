import React from 'react';
import './Notes.css';
import { StyledNote } from './StyledNotes';
import { EPianoNotes } from '../../SoundmakerController/types';

const emptyInstrumentNotes = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

const emptyBeatNotes = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0]
];

const getNoteRowStart = (note: EPianoNotes) => {
  switch (note) {
    case EPianoNotes.C:
      return 7;
    case EPianoNotes.D:
      return 6;
    case EPianoNotes.E:
      return 5;
    case EPianoNotes.F:
      return 4;
    case EPianoNotes.G:
      return 3;
    case EPianoNotes.A:
      return 2;
    case EPianoNotes.H:
      return 1;
  }
}

export function Notes(props: { notes: { instrument: string; note: string }[][] }) {
  const { notes } = props;
  return (
    <div className="notes">
      <div className="line"></div>
      <div className="notes-scroller">
        <div className="notes-board instrument-notes">
          {emptyInstrumentNotes.map((accord, accordIndex) => {
            return accord.map((item, noteIndex) => (
              <StyledNote
                rowStart={noteIndex + 1}
                rowEnd={noteIndex + 2}
                columnStart={accordIndex + 1}
                columnEnd={accordIndex + 1}
                key={noteIndex}
                needSolidBorder={(accordIndex + 1) % 2 === 0}
                needDarkerBorder={(accordIndex + 1) % 4 === 0}
              />
            ));
          })}

          {notes.map((accord, accordIndex) => {
            return accord.map((item, noteIndex) => {
              return (
                <StyledNote
                  rowStart={getNoteRowStart(item.note as EPianoNotes)}
                  rowEnd={getNoteRowStart(item.note as EPianoNotes) + 1}
                  columnStart={accordIndex + 1}
                  columnEnd={accordIndex + 1}
                  key={noteIndex}
                  className="note"
                />
              );
            });
          })}
        </div>
        <div className="notes-board beat-notes">
          {emptyBeatNotes.map((accord, accordIndex) => {
            return accord.map((item, noteIndex) => (
              <StyledNote
                rowStart={noteIndex + 1}
                rowEnd={noteIndex + 2}
                columnStart={accordIndex + 1}
                columnEnd={accordIndex + 1}
                key={noteIndex}
                needSolidBorder={(accordIndex + 1) % 2 === 0}
                needDarkerBorder={(accordIndex + 1) % 4 === 0}
              />
            ));
          })}
        </div>
      </div>
    </div>
  );
}
