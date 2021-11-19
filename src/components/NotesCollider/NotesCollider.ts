import phaserSceneDefault from "../PhaserScene/phaserSceneDefault";
import Phaser, { Game } from "phaser"
import { EPianoNotes } from "SoundmakerController/types";

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

        // const boundView = this.add.rectangle(bound.x + bound.width / 2, bound.y + bound.height / 2, bound.width, bound.height);
        // this.physics.world.enableBody(boundView);
        // boundView.body.setImmovable(true);

        this.body = this.game.add.rectangle(coords.x, coords.y, this.SIZE.WIDTH, this.SIZE.HEIGHT, 0x000000);
        this.game.physics.world.enableBody(this.body);
        // @ts-ignore;
        this.body.name = this.note;
    }


}