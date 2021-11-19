import { TNotes, TAccord, EPianoNotes } from '../../SoundmakerController/types';
import Phaser from 'phaser';
import { Note } from './Note';
import { SoundmakerControler } from '../../SoundmakerController';
import { Button, ETypeButtons, EColorButtons } from './Button';
import ButtonPNG from '../assets/buttons.png';
import Note0PNG from '../assets/notes_0.png';
import Note1PNG from '../assets/notes_1.png';
import Note2PNG from '../assets/notes_2.png';
import Note3PNG from '../assets/notes_3.png';
import Note4PNG from '../assets/notes_4.png';
import Note5PNG from '../assets/notes_5.png';
import Note6PNG from '../assets/notes_6.png';
import Note7PNG from '../assets/notes_7.png';
import Note8PNG from '../assets/notes_8.png';
import SpacePNG from '../assets/space.png';
import explosionRedPNG from '../assets/red.png';
import explosionGreenPNG from '../assets/green.png';

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
  coeff: number;
  scores: number;
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
  notesPlayed: [boolean[]];
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
    this.coeff = 1;
    this.scores = 0;
    this.notesPlayed = [[]];
  }

  init(data: ISceneData) {
    this.notesConfig = Array(10).fill([]).concat(data.track);
    this.soundController?.setTrack(this.notesConfig);
  }
  preload() {
    this.load.atlas('buttons', ButtonPNG, ButtonJSON);
    this.load.image('note_0', Note0PNG);
    this.load.image('note_1', Note1PNG);
    this.load.image('note_2', Note2PNG);
    this.load.image('note_3', Note3PNG);
    this.load.image('note_4', Note4PNG);
    this.load.image('note_5', Note5PNG);
    this.load.image('note_6', Note6PNG);
    this.load.image('note_7', Note7PNG);
    this.load.image('note_8', Note8PNG);
    this.load.image('space', SpacePNG);
    this.load.image('explosion_red', explosionRedPNG);
    this.load.image('explosion_green', explosionGreenPNG);
  }
  create() {
    this.sceneSize.footerHeight = 200;
    this.sceneSize.headerHeight = 120;
    this.sceneSize.footerWidth = this.scale.width;
    this.sceneSize.gameZoneWidth = (this.scale.width / (this.scale.width % 9)) * (this.scale.width % 9);
    this.sceneSize.gameZoneHeight = this.scale.height - this.sceneSize.footerHeight - this.sceneSize.headerHeight;
    this.sceneSize.gameZoneHorizontalPadding = this.scale.width - this.sceneSize.gameZoneWidth;
    this.renderScene();
    this.renderGameZone();
    this.notesRender();
    this.renderDestroyers();
    this.registerCatcherOverlap();
    this.registerDestroyerOverlap();
    this.renderButtons();
  }

  registerCatcherOverlap() {
    this.physics.world.addOverlap(
      this.notesGameObject.map((note) => note.gameObject),
      this.notesCatcherManager!.catchers.map((catcher) => catcher.gameObject),
      (note, catcher) => {
        const catcherInstanse = this.notesCatcherManager!.catchers.find(
          (catcher) => catcher.gameObject.name === note.name
        );
        const noteInstanse = this.notesGameObject.find((noteInst) => noteInst.data.note === note.name);
        noteInstanse.ready = true;
        // eslint-disable-next-line
        // @ts-ignore
        catcher.body.setEnable(false);
      }
    );
  }

  registerDestroyerOverlap() {
    this.physics.world.addOverlap(
      this.notesGameObject.map((note) => note.gameObject),
      this.destroyers,
      (note, destroyer) => {
        const catcher = this.notesCatcherManager?.catchers.find((catcher) => catcher.gameObject.name === note.name);

        if (catcher) {
          // eslint-disable-next-line
          // @ts-ignore
          catcher.gameObject.body.setEnable(true);
          catcher.isPressed = false;
        }

        const noteInstanse = this.notesGameObject.find(noteInst => noteInst.data.note === note.name);
        const index = Math.floor(this.soundController.timeline.currentTime / this.soundController.timeline.sampleTime);
        const specificNote = this.notesConfig[index].find(item => item.note === note.name);
        if (!specificNote?.played) {
          this.fart();
        }
        noteInstanse.ready = false;

        note.body.destroy();
        // eslint-disable-next-line
        // @ts-ignore
        note.setVisible(false);
      }
    );
  }

  fart() {
    this.soundController.isError = true;
  }

  renderDestroyers() {
    const size = { WIDTH: 100, HEIGHT: 10 };
    const notes = Object.values(EPianoNotes).reverse();
    this.destroyers = notes.map((note, i) => {
      const y: number = this.game.scale.height - (this.sceneSize.footerHeight / 10) * 6;
      const x: number =
        (this.game.scale.width / (notes.length + 2)) * i + size.WIDTH + this.sceneSize.gameZoneHorizontalPadding;
      const rect = this.add.rectangle(x, y, size.WIDTH, size.HEIGHT, 0x0c0c0c);
      this.physics.world.enableBody(rect);
      return rect;
    });
  }

  renderScene() {
    const { footerHeight, headerHeight, footerWidth, gameZoneWidth, gameZoneHeight, gameZoneHorizontalPadding } =
      this.sceneSize;
    this.add
      .rectangle(
        gameZoneWidth / 2 + gameZoneHorizontalPadding / 2,
        headerHeight / 2,
        gameZoneWidth,
        headerHeight,
        0x1a2639
      )
      .setDepth(1);

    this.add
      .image(gameZoneWidth / 2 + gameZoneHorizontalPadding / 2, gameZoneHeight / 2 + headerHeight * 2, 'space')
      .setDepth(-1);
    // Условная нижняя панель
    this.add
      .rectangle(footerWidth / 2, this.scale.height - footerHeight / 2, footerWidth, footerHeight, 0x1a2639)
      .setDepth(1);
    this.notesCatcherManager = new NotesCatcherManager(this);
  }

  renderGameZone() {
    const stepHor: number = this.sceneSize.gameZoneWidth / 9;
    this.stepNote = this.sceneSize.gameZoneHeight / 10;
    // Линии по которым будет движени
    for (let i = 0; i < 9; i += 1) {
      const x = Math.floor(i * stepHor + stepHor / 2 + this.sceneSize.gameZoneHorizontalPadding / 2);
      this.trackPosition.push(x);
      // this.add.rectangle(
      //   x,
      //   this.sceneSize.gameZoneHeight / 2 + this.sceneSize.headerHeight,
      //   2,
      //   this.sceneSize.gameZoneHeight,
      //   this.rainbowColor[i]
      // );
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
    const length = this.notesConfig.length;
    for (let i = 0; i < length; i++) {
      const tact = this.notesConfig[i];
      for (let j = 0; j < tact.length; j++) {
        const noteData = tact[j];
        if (noteData) {
          const noteIndex = ENotesDictionary[noteData.note];
          const radius = 20;
          const note = new Note(
            noteData,
            {
              x: this.trackPosition[noteIndex ?? 0],
              y: this.startRenderNotesPosition - this.stepNote * i,
              size: radius,
              color: this.rainbowColor[noteIndex ?? 0],
              index: noteIndex
            },
            this
          );

          this.notesGameObject.push(note);
        }
      }
    }
  }

  increaseScores() {
    this.scores += 10
    this.soundController.isError = false;
  }

  errorClick() {
    this.soundController.isError = true;
    this.coeff = 1;
  }

  handleButtonPressCheckNote(noteName: EPianoNotes) {
    const noteInstanse = this.notesGameObject.find(note => note.data.note === noteName);
    if (noteInstanse && noteInstanse.ready === true) {
      noteInstanse.kill(true);
      const index = Math.floor(this.soundController.timeline.currentTime / this.soundController.timeline.sampleTime);
      const specificNote = this.notesConfig[index].find(item => item.note === noteName);
      if (specificNote) specificNote.played = true;
      this.increaseScores();
    } else {
      noteInstanse.kill(false);
      this.errorClick()
    };
  }

  renderButtons() {
    const buttonPlay = new Button(
      this,
      ETypeButtons.rect,
      EColorButtons.blue,
      'start',
      { x: 950, y: 50 },
      'mouse',
      () => {
        if (buttonPlay.name === 'start') {
          this.start();
          buttonPlay.changeButton('pause');
        } else {
          this.pause();
          buttonPlay.changeButton('start');
        }
      }
    );

    const keyboardKeys = ['1', '2', '3', '4', '5', '6', '7'];
    const coords: { x: number; y: number }[] = [
      { x: 107, y: 1135 },
      { x: 317, y: 1135 },
      { x: 527, y: 1135 },
      { x: 747, y: 1135 },
      { x: 957, y: 1135 },
      { x: 1177, y: 1135 },
      { x: 1387, y: 1135 }
    ];
    Object.values(EPianoNotes)
      .reverse()
      .forEach((noteName, i) => {
        new Button(
          this,
          ETypeButtons.circle,
          EColorButtons.green,
          keyboardKeys[i].toLowerCase(),
          coords[i],
          'keyboard',
          this.handleButtonPressCheckNote.bind(this, noteName)
        );
      });
    new Button(this, ETypeButtons.rect, EColorButtons.red, 'back', { x: 110, y: 50 }, 'mouse', () => {
      window.history.back();
    });
    new Button(this, ETypeButtons.rect, EColorButtons.red, 'clear', { x: 350, y: 50 }, 'mouse', () => {
      setTimeout(this.reload.bind(this), 200);
    });
  }
  start() {
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
