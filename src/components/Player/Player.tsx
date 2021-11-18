import React from 'react';
import './Player.css';
import { SoundmakerControler } from 'SoundmakerController'
import { PlayerControls } from 'components/PlayerControls';
import { Tracks } from 'components/Tracks';
import { Notes } from 'components/Notes';
import { TAccord, EPianoNotes, EDrumNotes, TNotes, EInstruments } from '../../SoundmakerController/types';
import { notes } from './notes';

export function Player() {
  const controller = React.useMemo(() => {
    const track = notes as TAccord[];

    return track && new SoundmakerControler(track)
  }, [notes])

  const [currentProgress, setCurrentProgress] = React.useState(0);
  const [currentNotes, setNotes] = React.useState(notes);

  const removeNotes = () => {
    setNotes([]);
  }

  const setDefaultNotes = () => {
    setNotes(notes);
  }

  const getPianoNoteName = (note: number): TNotes | undefined => {
    switch (note) {
      case 7:
        return EPianoNotes.C;
      case 6:
        return EPianoNotes.D;
      case 5:
        return EPianoNotes.E;
      case 4:
        return EPianoNotes.F;
      case 3:
        return EPianoNotes.G;
      case 2:
        return EPianoNotes.A;
      case 1:
        return EPianoNotes.H;
    }
  }

  const getDrumNoteName = (note: number): TNotes | undefined => {
    switch (note) {
      case 2:
        return EDrumNotes.snare;
      case 1:
        return EDrumNotes.kick;
    }
  }

  const createNote = (tick: number, note: number, instrument: string) => {
    const notes = [...currentNotes];
    let _note;

    if (instrument === EInstruments.piano) {
      _note = getPianoNoteName(note)?.toString() ?? '';
    } else {
      _note = getDrumNoteName(note)?.toString() ?? '';
    }

    notes[tick].push({
      instrument,
      note: _note
    })

    setNotes(notes);
  }

  const deleteNote = (tick: number, note: number) => {
    const notes = [...currentNotes];

    notes.forEach((arr, index) => {
      if (index === tick) {
        delete arr[note];
      }
    })

    setNotes(notes);
  }

  React.useEffect(() => {
    controller?.on('currentTimeChange', () => {
      setCurrentProgress(Math.floor(controller.currentTime / 1000));
    });
  }, [controller]);

  return (
    <div className="player">
      <PlayerControls
        controller={controller as SoundmakerControler}
        removeNotes={removeNotes}
        setDefaultNotes={setDefaultNotes}
      />
      <Tracks />
      <Notes currentProgress={currentProgress} notes={currentNotes} createNote={createNote} deleteNote={deleteNote} />
    </div>
  );
}
