import React from 'react';
import Phaser from 'phaser';
import phaserSceneDefault from './phaserSceneDefault';
import { useLocation } from 'react-router-dom';
import { TAccord } from '../../SoundmakerController/types';
import { notes } from '../Player/notes';

export function Scene() {
  const location = useLocation();
  let track: TAccord[] = [];
  if (location && location.state) {
    // eslint-disable-next-line
    // @ts-ignore
    track = location.state.track;
  } else {
    track = JSON.parse(JSON.stringify(notes));
  }
  const gameRef = React.useRef<Phaser.Game | null>(null);
  React.useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      backgroundColor: '#000',
      canvasStyle: 'position: absolute; top: 0;',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: document.getElementById('phaser-wrapper')!,
        width: 1920,
        height: 1200
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: { y: 0 }
        }
      }
    };
    gameRef.current = new Phaser.Game(config);
    gameRef.current.scene.add('piano', phaserSceneDefault, true, { track });
  }, []);

  return (
    <div className="scene">
      <div id={'phaser-wrapper'} />
    </div>
  );
}
