import React, { useState } from 'react';
import './PlayerControls.css'
import { SoundmakerControler } from '../../SoundmakerController/SoundmakerControler';

export function PlayerControls({
  controller,
  removeNotes,
  setDefaultNotes
}: {
  controller: SoundmakerControler;
  removeNotes: () => void;
  setDefaultNotes: () => void
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    isPlaying ? controller?.stopPlaying() : controller?.startPlaying();
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="player-controls">
      <button className="player-control" type="button">Челендж!</button>

      <button className="player-control js-toggle-play-state" type="button" onClick={handleClick}>
        {isPlaying ? 'Стоп' : 'Играть'}
      </button>
      <button className="player-control" type="button" onClick={setDefaultNotes}>Восстановить демо</button>
      <button className="player-control" type="button" onClick={removeNotes}>Удалить всё</button>
    </div>
  );
}
