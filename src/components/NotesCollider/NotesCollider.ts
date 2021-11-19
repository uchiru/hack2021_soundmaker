import phaserSceneDefault from '../PhaserScene/phaserSceneDefault';
import Phaser, { Game } from 'phaser';
import { EPianoNotes } from 'SoundmakerController/types';

export class NotesCollider {
    game: phaserSceneDefault;
    note: EPianoNotes;
    body: Phaser.GameObjects.Rectangle;
    SIZE: { WIDTH: number, HEIGHT: number };

    constructor(
        game: phaserSceneDefault,
        note: EPianoNotes,
        coords: { x: number, y: number },
        size: { WIDTH: number, HEIGHT: number }
    ) {
        this.game = game;
        this.note = note;
        this.SIZE = size;

        this.body = this.game.add.rectangle(coords.x, coords.y, this.SIZE.WIDTH, this.SIZE.HEIGHT, 0x000000);
        this.game.physics.world.enableBody(this.body);
        // @ts-ignore;
        this.body.name = this.note;
    }


}
