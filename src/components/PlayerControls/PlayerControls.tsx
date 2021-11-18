import React from 'react';
import './PlayerControls.css'

export function PlayerControls() {
  return (
    <div className="player-controls">
      <button className="player-control" type="button">Челендж!</button>

      <button className="player-control js-return" type="button">&lt;= В начало</button>
      <button className="player-control js-toggle-play-state" type="button">Играть</button>
      <button className="player-control" type="button">Восстановить демо</button>
      <button className="player-control" type="button">Удалить всё</button>
    </div>
  );
}
