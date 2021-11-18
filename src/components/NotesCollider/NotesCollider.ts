import phaserSceneDefault from '../PhaserScene/phaserSceneDefault';
import Phaser, { Game } from 'phaser';
import { EPianoNotes } from 'SoundmakerController/types';

export class NotesCollider {
  game: phaserSceneDefault;
  note: EPianoNotes;
  body: Phaser.GameObjects.Rectangle;

  constructor(game: phaserSceneDefault, note: EPianoNotes, coords: { x: number; y: number }) {
    this.game = game;
    this.note = note;
    console.log(this.note);

    this.body = this.game.add.rectangle(coords.x, coords.y, 100, 100, 0x00ff55);
    this.game.physics.world.enable(this.body);
  }
}
