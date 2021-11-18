import React from 'react';
import './Player.css';
import { PlayerControls } from 'components/PlayerControls';
import { Tracks } from 'components/Tracks';
import { Notes } from 'components/Notes';

const notes = [
  [
    {
      instrument: 'piano',
      note: 'H'
    },
    {
      instrument: 'drum',
      note: 'kick'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'A'
    },
    {
      instrument: 'drum',
      note: 'snare'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'G'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'F'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'E'
    }
  ]
]

export function Player() {
  return (
    <div className="player">
      <PlayerControls />
      <Tracks />
      <Notes notes={notes} />
    </div>
  );
}
