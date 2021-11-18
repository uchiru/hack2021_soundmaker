import React from 'react';
import './Player.css';
import { SoundmakerControler } from 'SoundmakerController'
import { PlayerControls } from 'components/PlayerControls';
import { Tracks } from 'components/Tracks';
import { Notes } from 'components/Notes';
import { TAccord } from '../../SoundmakerController/types';

const notes = [
  [
    {
      instrument: 'piano',
      note: 'F'
    },
    {
      instrument: 'drum',
      note: 'kick'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'E'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'D'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'C'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'G'
    }
  ],
  [],
  [
    {
      instrument: 'piano',
      note: 'G'
    }
  ],
]

export function Player() {
  const controller = React.useMemo(() => {
    const track = notes as TAccord[];

    return track && new SoundmakerControler(track)
  }, [notes])

  return (
    <div className="player">
      <PlayerControls controller={controller as SoundmakerControler} />
      <Tracks />
      <Notes notes={notes} />
    </div>
  );
}
