import React from 'react';
import './Player.css';
import { SoundmakerControler } from 'SoundmakerController'
import { PlayerControls } from 'components/PlayerControls';
import { Tracks } from 'components/Tracks';
import { Notes } from 'components/Notes';
import { TAccord } from '../../SoundmakerController/types';
import { notes } from './notes';

export function Player() {
  const controller = React.useMemo(() => {
    const track = notes as TAccord[];

    return track && new SoundmakerControler(track)
  }, [notes])
  const [currentProgress, setCurrentProgress] = React.useState(0);

  React.useEffect(() => {
    controller?.on('currentTimeChange', () => {
      setCurrentProgress(Math.floor(controller.currentTime / 1000));
    });
  }, [controller]);

  return (
    <div className="player">
      <PlayerControls controller={controller as SoundmakerControler} />
      <Tracks />
      <Notes currentProgress={currentProgress} notes={notes} />
    </div>
  );
}
