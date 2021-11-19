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
  index?: number;
}

export class Note {
  game: Scene;
  data: INoteData;
  view: INoteView;
  gameObject: GameObjects.Image | undefined;
  private particlesGreen?: Phaser.GameObjects.Particles.ParticleEmitter;
  private particlesRed?: Phaser.GameObjects.Particles.ParticleEmitter;
  constructor(data: INoteData, view: INoteView, game: Scene) {
    this.game = game;
    this.data = data;
    this.view = view;
    this.render();
  }

  render() {
    const { x, y, index } = this.view;
    const img = this.game.add.image(x, y, `note_${index}`).setScale(0.5);
    const particlesGreen = this.game.add.particles('explosion_green');
    const particlesRed = this.game.add.particles('explosion_red');

    this.particlesGreen = particlesGreen.createEmitter({
      lifespan: 1000,
      speed: 400,
      scale: { start: 0.7, end: 0 },
      blendMode: 'ADD',
      on: false
    });

    this.particlesRed = particlesRed.createEmitter({
      lifespan: 1000,
      speed: 400,
      scale: { start: 0.7, end: 0 },
      blendMode: 'ADD',
      on: false
    });
    this.gameObject = this.game.physics.add.existing(img, false);
    this.gameObject.name = this.data.note;
  }

  start(step: number) {
    const time = 1 / Math.floor(BPM / 60);
    // eslint-disable-next-line
    // @ts-ignore
    if (this.gameObject) this.gameObject.body.setVelocityY(step / time);
  }

  pause() {
    // eslint-disable-next-line
    // @ts-ignore
    if (this.gameObject) this.gameObject.body.setVelocityY(0);
  }
  kill(result: boolean) {
    // let particles;
    if (this.gameObject && this.particlesGreen && this.particlesRed) {
      // eslint-disable-next-line
      // @ts-ignore
      const { x, y } = this.gameObject.getCenter();
      if (result) {
        console.log(result)
        // particles = this.particlesGreen;
      } else {
        console.log(result);
        // particles = this.particlesRed;
      }
      // particles.setPosition(x, y);
      // particles.start();
      // setTimeout(particles.stop.bind(this), 300);
    }
  }
}
