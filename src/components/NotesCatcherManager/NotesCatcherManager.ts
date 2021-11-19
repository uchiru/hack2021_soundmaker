import { NotesCollider } from 'components/NotesCollider/NotesCollider';
import phaserSceneDefault from '../PhaserScene/phaserSceneDefault';
import { EPianoNotes } from 'SoundmakerController/types';

export interface INotesCatcherManager {
    game: phaserSceneDefault;
    catchers: NotesCollider[];
}

export class NotesCatcherManager<INotesCatcherManager> {
    game: phaserSceneDefault;
    catchers: NotesCollider[];
    constructor(game: phaserSceneDefault) {
        this.game = game;

        const notes = Object.values(EPianoNotes).reverse();
        const size = { WIDTH: 100, HEIGHT: 10 }
        this.catchers = notes.map((note, i) => {
            const y: number = this.game.scale.height - this.game.sceneSize.footerHeight / 10 * 9;
            const x: number = this.game.scale.width / (notes.length + 2) * i + size.WIDTH + this.game.sceneSize.gameZoneHorizontalPadding;
            return new NotesCollider(game, note, { x, y }, size)
        })
    }
}
