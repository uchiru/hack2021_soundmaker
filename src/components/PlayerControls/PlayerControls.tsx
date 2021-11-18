import React, { useState } from 'react';
import './PlayerControls.css'
import { SoundmakerControler } from '../../SoundmakerController/SoundmakerControler';

export function PlayerControls({ controller }: { controller: SoundmakerControler }) {
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
    </div>
  );
}
