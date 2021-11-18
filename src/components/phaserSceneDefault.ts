import { TNotes, EPianoNotes, EDrumNotes } from '../SoundmakerController/types';
import Phaser from 'phaser';
import { TICK_TIME } from '../SoundmakerController/const';
import { INotesCatcherManager, NotesCatcherManager } from './NotesCatcherManager/NotesCatcherManager';
import { NotesCollider } from './NotesCollider/NotesCollider';

interface iNote {
  instrument: string;
  note: TNotes;
}

enum ENotesDictionary {
  kick = 8,
  snare = 7,
  H = 6,
  A = 5,
  G = 4,
  F = 3,
  E = 2,
  D = 1,
  C = 0
}
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
  notesConfig: iNote[][];
  notesGameObject: Phaser.GameObjects.Arc[];
  notesCatcherManager: INotesCatcherManager | null;
  catchers?: NotesCollider[];;
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
    this.notesConfig = [
      [],
      [],
      [],
      [
        { instrument: 'drumm', note: EDrumNotes.kick },
        { instrument: 'piano', note: EPianoNotes.F },
        { instrument: 'piano', note: EPianoNotes.C }
      ],
      [
        { instrument: 'drumm', note: EDrumNotes.kick },
        { instrument: 'piano', note: EPianoNotes.A }
      ],
      [{ instrument: 'piano', note: EPianoNotes.G }],
      [{ instrument: 'piano', note: EPianoNotes.F }],
      [{ instrument: 'piano', note: EPianoNotes.E }]
    ];
    this.notesGameObject = [];
    this.notesCatcherManager = null;
  }
  preload() {
    console.log('defaultScene preload', this);
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
    setTimeout(this.start.bind(this), 2500);
  }

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
    // линии горизонтальные
    for (let i = 0; i <= 10; i += 1) {
      const y = i * this.stepNote + this.stepNote / 2 + this.sceneSize.headerHeight / 4;
      // this.add.rectangle(
      //   this.sceneSize.gameZoneWidth / 2 + this.sceneSize.gameZoneHorizontalPadding / 2,
      //   y,
      //   this.sceneSize.gameZoneWidth,
      //   2,
      //   0xffffff
      // );
      if (i === 10) this.startRenderNotesPosition = y;
    }
  }
  notesRender() {
    console.log(this.notesConfig);
    const length = this.notesConfig.length;
    for (let i = 0; i < length; i++) {
      const tact = this.notesConfig[i];
      for (let j = 0; j < tact.length; j++) {
        const noteData = tact[j];
        // @ts-ignore
        const noteIndex = ENotesDictionary[noteData.note];
        const radius = 20;
        let circle = this.add.circle(
          this.trackPosition[noteIndex],
          this.startRenderNotesPosition - this.stepNote * i,
          radius,
          this.rainbowColor[noteIndex]
        );
        circle = this.physics.add.existing(circle, false);
        this.notesGameObject.push(circle);
      }
    }
  }
  start() {
    this.notesGameObject.forEach((note) => {
      // @ts-ignore
      note.body.setVelocityY(this.stepNote / (TICK_TIME / 1000));
    });
  }
  reload(notes: iNote[][]) {
    this.notesConfig = notes;
    this.scene.restart();
  }
}
