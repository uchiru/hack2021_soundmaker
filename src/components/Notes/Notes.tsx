import React from 'react';
import './Notes.css';
import { StyledNote, StyledNotesBoard, StyledLine } from './StyledNotes';
import { EPianoNotes, EDrumNotes, EInstruments, TNotes } from '../../SoundmakerController/types';
import { MAX_TRACK_SECONDS } from 'SoundmakerController/const';

const ticksCount = MAX_TRACK_SECONDS * 2;

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
};

const emptyInstrumentNotes = generateEmtyItems(ticksCount, 7);
const emptyBeatNotes = generateEmtyItems(ticksCount, 3);

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
      case EDrumNotes.cymbal:
        return 3;
      case EPianoNotes.A:
      case EDrumNotes.snare:
        return 2;
      case EPianoNotes.H:
      case EDrumNotes.kick:
        return 1;
    }
  }
};

export function Notes(props: {
  currentProgress: number;
  createNote: (tick: number, note: number, instrument: string) => void;
  deleteNote: (tick: number, note: number) => void;
  notes: {
    instrument: string;
    note: string;
  }[][];
}) {
  const { notes, currentProgress, createNote, deleteNote } = props;

  const cell = React.useRef<HTMLInputElement>(null);

  return (
    <div className="notes">
      <StyledLine
        className="line"
        position={currentProgress}
        cellWidth={cell?.current?.getBoundingClientRect().width}
      />
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
                onClick={() => createNote(accordIndex, noteIndex + 1, EInstruments.piano)}
                className="note"
              />
            ));
          })}

          {notes.map((accord, accordIndex) =>
            accord.map(
              (item, noteIndex) =>
                item.instrument === EInstruments.piano && (
                  <StyledNote
                    rowStart={getNoteRowStart(item.note as EPianoNotes)}
                    rowEnd={getNoteRowStart(item.note as EPianoNotes)}
                    columnStart={accordIndex + 1}
                    columnEnd={accordIndex + 1}
                    key={noteIndex}
                    bg={`var(--color-${item.note})`}
                    className="note"
                    onClick={() => deleteNote(accordIndex, noteIndex)}
                  />
                )
            )
          )}
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
                onClick={() => createNote(accordIndex, noteIndex + 1, EInstruments.drum)}
                className="note"
              />
            ));
          })}

          {notes.map((accord, accordIndex) =>
            accord.map(
              (item, noteIndex) =>
                item.instrument === EInstruments.drum && (
                  <StyledNote
                    rowStart={getNoteRowStart(item.note as EDrumNotes)}
                    rowEnd={getNoteRowStart(item.note as EDrumNotes)}
                    columnStart={accordIndex + 1}
                    columnEnd={accordIndex + 1}
                    key={noteIndex}
                    bg={`var(--color-${item.note})`}
                    className="note"
                    onClick={() => deleteNote(accordIndex, noteIndex)}
                  />
                )
            )
          )}
          <div ref={cell}></div>
        </StyledNotesBoard>
      </div>
    </div>
  );
}
