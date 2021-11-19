import { TNotes } from '../../SoundmakerController/types';
import { Scene, GameObjects } from 'phaser';
import { BPM } from '../../SoundmakerController/const';
interface INoteData {
  instrument: string;
  note: TNotes;
}
interface INoteView {
  x: number;
  y: number;
  size: number;
  color: number;
}

export class Note {
  game: Scene;
  data: INoteData;
  view: INoteView;
  gameObject: GameObjects.Arc | undefined;
  constructor(data: INoteData, view: INoteView, game: Scene) {
    this.game = game;
    this.data = data;
    this.view = view;
    this.render();
  }

  render() {
    const { x, y, size, color } = this.view;
    const circle = this.game.add.circle(x, y, size, color);
    this.gameObject = this.game.physics.add.existing(circle, false);
    this.gameObject.name = this.data.note;
  }

  start(step: number) {
    const time = 1 / Math.floor(BPM / 60);
    // eslint-disable-next-line\
    // @ts-ignore
    if (this.gameObject) this.gameObject.body.setVelocityY(step / time);
  }

  pause() {
    // @ts-ignore
    if (this.gameObject) this.gameObject.body.setVelocityY(0);
  }
  kill() {
    console.log('kill');
  }
}
