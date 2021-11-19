import phaserSceneDefault from '../PhaserScene/phaserSceneDefault';
import Phaser, { Game } from 'phaser';
import { EPianoNotes } from 'SoundmakerController/types';

export class NotesCollider {
    game: phaserSceneDefault;
    note: EPianoNotes;
    gameObject: Phaser.GameObjects.Rectangle;
    SIZE: { WIDTH: number, HEIGHT: number };
    isPressed: boolean;

    constructor(
        game: phaserSceneDefault,
        note: EPianoNotes,
        coords: { x: number, y: number },
        size: { WIDTH: number, HEIGHT: number }
    ) {
        this.isPressed = false;
        this.game = game;
        this.note = note;
        this.SIZE = size;

        this.gameObject = this.game.add.rectangle(coords.x, coords.y, this.SIZE.WIDTH, this.SIZE.HEIGHT, 0xff0000);
        this.game.physics.world.enableBody(this.gameObject);
        // @ts-ignore;
        this.gameObject.name = this.note;
    }


}
