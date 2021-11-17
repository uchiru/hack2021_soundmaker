import React from 'react';
import Phaser from 'phaser';
import phaserSceneDefault from './phaserSceneDefault';

interface SceneProps {
  onFail: () => void;
  onStart: () => void;
  onSuccess: (newLevel: number) => void;
}

export function Scene(props: SceneProps) {
  const { onFail, onSuccess, onStart } = props;
  const gameRef = React.useRef<Phaser.Game | null>(null);
  const activeSceneRef = React.useRef(null);
  React.useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      // autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      backgroundColor: '#B3DFFF',
      canvasStyle: 'position: absolute; top: 0;',
      scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        parent: document.getElementById('phaser-wrapper')!,
        width: 2880,
        height: 1000
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
