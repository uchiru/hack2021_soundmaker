import React, { useState } from 'react';
import './PlayerControls.css'

export function PlayerControls({ isPlaying, handleClick, removeNotes}: { isPlaying: boolean; handleClick: () => void; removeNotes: () => void }) {
  return (
    <div className="player-controls">
      <a href="/scene" className="player-control"><span>😈</span> Челендж</a>

      <button className="player-control js-toggle-play-state" type="button" onClick={handleClick}>
        {isPlaying ? <><span>⏹</span> Остановить</> : <><span>▶️</span> Играть</>} трек
      </button>

      <button className="player-control" type="button" onClick={removeNotes}><span>🗑</span> Удалить трек</button>
    </div>
  );
}
