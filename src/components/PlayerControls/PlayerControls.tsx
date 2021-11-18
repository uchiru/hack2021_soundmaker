import React from 'react';
import { Link } from 'react-router-dom';
import './PlayerControls.css';
import { TAccord } from '../../SoundmakerController/types';

export function PlayerControls({
  isPlaying,
  handleClick,
  removeNotes,
  restoreNotes,
  track
}: {
  isPlaying: boolean;
  handleClick: () => void;
  removeNotes: () => void;
  restoreNotes: () => void;
  track: TAccord[];
}) {
  return (
    <div className="player-controls">
      <Link
        to={{
          pathname: '/scene',
          state: { track: track }
        }}
        className="player-control"
      >
        <span>😈</span> Челендж
      </Link>

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

      <button className="player-control" type="button" onClick={restoreNotes}>
        <span>🔄</span> Восстановить трек
      </button>

      <button className="player-control" type="button" onClick={removeNotes}>
        <span>🗑</span> Удалить трек
      </button>
    </div>
  );
}
