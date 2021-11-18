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
      <a href="/scene" className="player-control"><span>😈</span> Челендж</a>

      <button className="player-control js-toggle-play-state" type="button" onClick={handleClick}>
        {isPlaying ? <><span>⏹</span> Остановить</> : <><span>▶️</span> Играть</>} трек
      </button>
      <button className="player-control" type="button" onClick={setDefaultNotes}><span>🔄</span> Восстановить трек</button>
      <button className="player-control" type="button" onClick={removeNotes}><span>🗑</span> Удалить трек</button>
    </div>
  );
}
