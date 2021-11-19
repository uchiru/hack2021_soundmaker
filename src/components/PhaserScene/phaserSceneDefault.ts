import { TNotes, TAccord, EPianoNotes } from '../../SoundmakerController/types';
import Phaser from 'phaser';
import { Note } from './Note';
import { SoundmakerControler } from '../../SoundmakerController';
import { Button, ETypeButtons, EColorButtons } from './Button';
import ButtonPNG from '../assets/buttons.png';
import ButtonJSON from '../assets/buttons.json';
import { store } from 'storeContext';
import { INotesCatcherManager, NotesCatcherManager } from '../NotesCatcherManager';
import { NotesCollider } from '../NotesCollider';

interface ISceneData {
  track: TAccord[];
}
const ENotesDictionary: { [key in TNotes]?: number } = {
  cymbal: 9,
  kick: 8,
  snare: 7,
  H: 6,
  A: 5,
  G: 4,
  F: 3,
  E: 2,
  D: 1,
  C: 0
};

export default class phaserSceneDefault extends Phaser.Scene {
  sceneSize: {
    footerHeight: number;
    headerHeight: number;
    footerWidth: number;
    gameZoneWidth: number;
    gameZoneHeight: number;
    gameZoneHorizontalPadding: number;
  };
  stepNote: number;
  rainbowColor: number[];
  trackPosition: number[];
  startRenderNotesPosition: number;
  notesConfig: TAccord[];
  verticalStepCount: number;
  notesGameObject: any[];
  soundController: SoundmakerControler = store.soundmakerController;
  notesCatcherManager: INotesCatcherManager | null;
  catchers?: NotesCollider[];
  destroyers: Phaser.GameObjects.Rectangle[];
  private isPaused: boolean;
  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
    this.sceneSize = {
      footerHeight: 0,
      headerHeight: 0,
      footerWidth: 0,
      gameZoneWidth: 0,
      gameZoneHeight: 0,
      gameZoneHorizontalPadding: 0
    };
    this.rainbowColor = [0xfe8176, 0xfe9f6d, 0xfddc22, 0x85cd51, 0x8feacd, 0x6d9cf3, 0x9664ed, 0xcecece, 0xf0f0f0];
    this.trackPosition = [];
    this.startRenderNotesPosition = 0;
    this.stepNote = 0;
    this.notesConfig = [];
    this.notesGameObject = [];
    this.notesCatcherManager = null;
    this.destroyers = [];
    this.verticalStepCount = 10;
    this.isPaused = false;
  }

  init(data: ISceneData) {
    this.notesConfig = Array(10).fill([]).concat(data.track);
    this.soundController?.setTrack(this.notesConfig);
  }
  preload() {
    this.load.atlas('buttons', ButtonPNG, ButtonJSON);
  }
  create() {
    this.sceneSize.footerHeight = 200;
    this.sceneSize.headerHeight = 100;
    this.sceneSize.footerWidth = this.scale.width;
    this.sceneSize.gameZoneWidth = (this.scale.width / (this.scale.width % 9)) * (this.scale.width % 9);
    this.sceneSize.gameZoneHeight = this.scale.height - this.sceneSize.footerHeight - this.sceneSize.headerHeight;
    this.sceneSize.gameZoneHorizontalPadding = this.scale.width - this.sceneSize.gameZoneWidth;
    this.renderScene();
    this.renderGameZone();
    this.notesRender();
    this.renderDestroyers();
    this.physics.world.addOverlap(
      this.notesGameObject.map(note => note.gameObject),
      this.notesCatcherManager!.catchers.map(catcher => catcher.body),
      (note, collider) => {
        console.log(note.name, collider.name);
        // @ts-ignore
        collider.body.setEnable(false);
      }
    );

    this.physics.world.addOverlap(
      this.notesGameObject.map(note => note.gameObject),
      this.destroyers,
      (note, destroyer) => {
        // note.kill()
        const catcher = this.notesCatcherManager?.catchers.find(catcher => catcher.body.name === note.name);
        // @ts-ignore
        if (catcher) catcher.body.body.setEnable(true);
        console.log(`collider ${note.name} activated`);
        note.body.destroy();
      }
    );
    this.renderButtons();
  }

  renderDestroyers() {
    const size = { WIDTH: 100, HEIGHT: 10 }
    const notes = Object.values(EPianoNotes).reverse();
    this.destroyers = notes.map((note, i) => {
      const y: number = this.game.scale.height - this.sceneSize.footerHeight / 6;
      const x: number = this.game.scale.width / (notes.length + 2) * i + size.WIDTH + this.sceneSize.gameZoneHorizontalPadding;
      const rect = this.add.rectangle(x, y, size.WIDTH, size.HEIGHT, 0x0c0c0c);
      this.physics.world.enableBody(rect);
      return rect;
    })
  };

  renderScene() {
    const { footerHeight, headerHeight, footerWidth, gameZoneWidth, gameZoneHeight, gameZoneHorizontalPadding } =
      this.sceneSize;
    // Условная верхняя панель
    this.add.rectangle(
      gameZoneWidth / 2 + gameZoneHorizontalPadding / 2,
      headerHeight / 2,
      gameZoneWidth,
      headerHeight,
      0x3c4d1c
    );
    // Условная игровая зона
    this.add.rectangle(
      gameZoneWidth / 2 + gameZoneHorizontalPadding / 2,
      gameZoneHeight / 2 + headerHeight,
      gameZoneWidth,
      gameZoneHeight,
      0x000
    );
    // Условная нижняя панель
    this.add.rectangle(footerWidth / 2, this.scale.height - footerHeight / 2, footerWidth, footerHeight, 0xff0000);
    this.notesCatcherManager = new NotesCatcherManager(this);
  }

  renderGameZone() {
    const stepHor: number = this.sceneSize.gameZoneWidth / 9;
    this.stepNote = this.sceneSize.gameZoneHeight / 10;
    // Линии по которым будет движени
    for (let i = 0; i < 9; i += 1) {
      const x = Math.floor(i * stepHor + stepHor / 2 + this.sceneSize.gameZoneHorizontalPadding / 2);
      this.trackPosition.push(x);
      this.add.rectangle(
        x,
        this.sceneSize.gameZoneHeight / 2 + this.sceneSize.headerHeight,
        2,
        this.sceneSize.gameZoneHeight,
        this.rainbowColor[i]
      );
    }
    //Отладочная сетка
    // for (let i = 0; i <= this.verticalStepCount; i += 1) {
    //   const y = i * this.stepNote + this.stepNote / 2 + this.sceneSize.headerHeight / 4;
    //
    //   this.add.rectangle(
    //     this.sceneSize.gameZoneWidth / 2 + this.sceneSize.gameZoneHorizontalPadding / 2,
    //     y,
    //     this.sceneSize.gameZoneWidth,
    //     2,
    //     0xffffff
    //   );
    //   if (i === this.verticalStepCount) this.startRenderNotesPosition = y;
    // }
    this.startRenderNotesPosition =
      this.verticalStepCount * this.stepNote + this.stepNote / 2 + this.sceneSize.headerHeight / 4;
  }
  notesRender() {
    console.log(this.notesConfig);
    const length = this.notesConfig.length;
    for (let i = 0; i < length; i++) {
      const tact = this.notesConfig[i];
      for (let j = 0; j < tact.length; j++) {
        const noteData = tact[j];
        console.log(noteData);
        if (noteData) {
          const noteIndex = ENotesDictionary[noteData.note];
          const radius = 20;
          const note = new Note(
            noteData,
            {
              x: this.trackPosition[noteIndex ?? 0],
              y: this.startRenderNotesPosition - this.stepNote * i,
              size: radius,
              color: this.rainbowColor[noteIndex ?? 0]
            },
            this
          );

          this.notesGameObject.push(note);
          console.log(this.notesGameObject);
        }
      }
    }
  }
  renderButtons() {
    const buttonPlay = new Button(this, ETypeButtons.rect, EColorButtons.blue, 'start', { x: 950, y: 50 }, () => {
      if (buttonPlay.name === 'start') {
        this.start();
        buttonPlay.changeButton('pause');
      } else {
        this.pause();
        buttonPlay.changeButton('start');
      }
    });
    new Button(this, ETypeButtons.rect, EColorButtons.red, 'back', { x: 110, y: 50 }, () => {
      window.history.back();
    });
    new Button(this, ETypeButtons.rect, EColorButtons.red, 'clear', { x: 350, y: 50 }, () => {
      setTimeout(this.reload.bind(this), 200);
    });
    new Button(this, ETypeButtons.circle, EColorButtons.green, 's', { x: 107, y: 1100 }, () => {
      setTimeout(this.reload.bind(this), 200);
    });
  }
  start() {
    debugger;
    this.notesGameObject.forEach((note) => {
      note.start(this.stepNote);
    });
    if (this.isPaused) {
      this.soundController?.resume();
    } else {
      this.soundController?.startPlaying();
    }
  }
  pause() {
    this.notesGameObject.forEach((note) => {
      note.pause();
    });
    this.isPaused = true;
    this.soundController?.pause();
  }
  reload() {
    this.stepNote = 0;
    this.notesConfig = [];
    this.notesGameObject = [];
    this.notesCatcherManager = null;
    this.verticalStepCount = 10;
    this.isPaused = false;
    this.scene.restart();
  }
}
