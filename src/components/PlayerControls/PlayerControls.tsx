import React, { useState } from 'react';
import './PlayerControls.css'

export function PlayerControls({ isPlaying, handleClick }: { isPlaying: boolean; handleClick: () => void }) {
  return (
    <div className="player-controls">
      <a href="/scene" className="player-control"><span>😈</span> Челендж</a>

      <button className="player-control js-toggle-play-state" type="button" onClick={handleClick}>
        {isPlaying ? <><span>⏹</span> Остановить</> : <><span>▶️</span> Играть</>} трек
      </button>
    </div>
  );
}
