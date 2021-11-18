import React from 'react';
import './PlayerControls.css';

export function PlayerControls({ isPlaying, handleClick, removeNotes, restoreNotes }: { isPlaying: boolean; handleClick: () => void; removeNotes: () => void; restoreNotes: () => void }) {
  return (
    <div className="player-controls">
      <a href="/scene" className="player-control">
        <span>😈</span> Челендж
      </a>

      <button className="player-control js-toggle-play-state" type="button" onClick={handleClick}>
        {isPlaying ? (
          <>
            <span>⏹</span> Остановить
          </>
        ) : (
          <>
            <span>▶️</span> Играть
          </>
        )}
        трек
      </button>

      <button className="player-control" type="button" onClick={restoreNotes}><span>🔄</span> Восстановить трек</button>

      <button className="player-control" type="button" onClick={removeNotes}><span>🗑</span> Удалить трек</button>
    </div>
  );
}
