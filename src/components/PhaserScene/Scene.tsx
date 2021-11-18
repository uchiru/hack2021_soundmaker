import React from 'react';
import Phaser from 'phaser';
import phaserSceneDefault from './phaserSceneDefault';
import { useLocation } from 'react-router-dom';
import { TAccord } from '../../SoundmakerController/types';
import { SoundmakerControler } from '../../SoundmakerController';
import { notes } from '../Player/notes';

export function Scene() {
  const location = useLocation();
  let track: TAccord[] = [];
  if (location && location.state) {
    // @ts-ignore
    track = location.state.track;
  } else {
    track = JSON.parse(JSON.stringify(notes));
  }
  console.log(track);
  const gameRef = React.useRef<Phaser.Game | null>(null);
  const activeSceneRef = React.useRef(null);
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
          debug: false,
          gravity: { y: 0 }
        }
      },
      scene: phaserSceneDefault
    };
    gameRef.current = new Phaser.Game(config);
  }, []);

  return (
    <div className="scene">
      <div id={'phaser-wrapper'} />
    </div>
  );
}
