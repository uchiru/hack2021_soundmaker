import { NotesCollider } from "components/NotesCollider/NotesCollider";
import phaserSceneDefault from "components/phaserSceneDefault";
import Phaser from "phaser"
import { EPianoNotes } from "SoundmakerController/types";

export interface INotesCatcherManager {
    game: phaserSceneDefault;
    catchers: NotesCollider[];
}

export class NotesCatcherManager<INotesCatcherManager>{
    game: phaserSceneDefault;
    catchers: NotesCollider[];
    constructor(game: phaserSceneDefault) {
        this.game = game;

        const notes = Object.values(EPianoNotes).reverse();
        this.catchers = notes.map((note, i) => {
            const y: number = this.game.scale.height - this.game.sceneSize.footerHeight / 2;
            const x: number = this.game.scale.width / (notes.length + 2) * i + 105;
            return new NotesCollider(game, note, { x, y })
        })
    }
}