import React from 'react';
import { Link } from 'react-router-dom';
import './PlayerControls.css';
import { TAccord } from '../../SoundmakerController/types';

export function PlayerControls({
  isPlaying,
  isPaused,
  handleClick,
  handlePauseClick,
  removeNotes,
  restoreNotes,
  track
}: {
  isPlaying: boolean;
  isPaused: boolean;
  handleClick: () => void;
  handlePauseClick: () => void;
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

      <button className="player-control" type="button" onClick={handleClick}>
        {isPlaying ? (
          <>
            <span>⏹</span> Остановить&nbsp;
          </>
        ) : (
          <>
            <span>▶️</span> Играть&nbsp;
          </>
        )}
        трек
      </button>

      <button
        className="player-control"
        type="button"
        onClick={handlePauseClick}
        style={{ opacity: isPlaying ? 1 : 0.5 }}
      >
        {isPaused ? (
          <>
            <span>▶️</span> Продолжить
          </>
        ) : (
          <>
            <span>⏸️</span> Пауза
          </>
        )}
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
