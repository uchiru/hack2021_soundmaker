import React from 'react';
import './Notes.css';
import { StyledNote, StyledNotesBoard } from './StyledNotes';
import { EPianoNotes, EDrumNotes, EInstruments, TNotes } from '../../SoundmakerController/types';
import { MAX_TRACK_SECONDS } from 'SoundmakerController/const';

const ticksCount = MAX_TRACK_SECONDS * 4;

const generateEmtyItems = (count: number, size: number) => {
  const arr = [];

  for (let i = 0; i < count; i++) {
    const tick = [];

    for (let j = 0; j < size; j++) {
      tick.push(j);
    }

    arr.push(tick);
  }

  return arr;
}

const emptyInstrumentNotes = generateEmtyItems(ticksCount, 7);
const emptyBeatNotes = generateEmtyItems(ticksCount, 2);

const getNoteRowStart = (note: TNotes) => {
  if (note) {
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
      case EDrumNotes.snare:
        return 2;
      case EPianoNotes.H:
      case EDrumNotes.kick:
        return 1;
    }
  }
}

export function Notes(props: { notes: { instrument: string; note: string }[][] }) {
  const { notes } = props;
  return (
    <div className="notes">
      <div className="line"></div>
      <div className="notes-scroller">
        <StyledNotesBoard className="notes-board instrument-notes" columnCount={ticksCount}>
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
                item.instrument === EInstruments.piano &&
                <StyledNote
                  rowStart={getNoteRowStart(item.note as EPianoNotes)}
                  rowEnd={getNoteRowStart(item.note as EPianoNotes)}
                  columnStart={accordIndex + 1}
                  columnEnd={accordIndex + 1}
                  key={noteIndex}
                  bg={`var(--color-${item.note})`}
                  className="note"
                />
              )
            });
          })}
        </StyledNotesBoard>
        <StyledNotesBoard className="notes-board beat-notes" columnCount={ticksCount}>
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

          {notes.map((accord, accordIndex) => {
            return accord.map((item, noteIndex) => {
              return (
                item.instrument === EInstruments.drum &&
                <StyledNote
                  rowStart={getNoteRowStart(item.note as EDrumNotes)}
                  rowEnd={getNoteRowStart(item.note as EDrumNotes)}
                  columnStart={accordIndex + 1}
                  columnEnd={accordIndex + 1}
                  key={noteIndex}
                  bg={`var(--color-${item.note})`}
                  className="note"
                />
              )
            });
          })}
        </StyledNotesBoard>
      </div>
    </div>
  );
}
