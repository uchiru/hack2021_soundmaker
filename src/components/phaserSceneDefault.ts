export default class phaserSceneDefault extends Phaser.Scene {
  sceneSize: {
    footerHeight: number;
    headerHeight: number;
    footerWidth: number;
    gameZoneWidth: number;
    gameZoneHeight: number;
    gameZoneHorizontalPadding: number;
  };
  rainbowColor: number[];
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
    this.rainbowColor = [0xfe8176, 0xfe9f6d, 0xfddc22, 0x85cd51, 0x8feacd, 0x6d9cf3, 0x9664ed];
  }
  preload() {
    console.log('defaultScene preload', this);
  }
  create() {
    this.sceneSize.footerHeight = 200;
    this.sceneSize.headerHeight = 100;
    this.sceneSize.footerWidth = this.scale.width;
    this.sceneSize.gameZoneWidth = (this.scale.width % 7) * 700;
    this.sceneSize.gameZoneHeight = this.scale.height - this.sceneSize.footerHeight - this.sceneSize.headerHeight;
    this.sceneSize.gameZoneHorizontalPadding = this.scale.width - this.sceneSize.gameZoneWidth;
    this.renderScene();
    this.renderGameZone();
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
  }

  renderGameZone() {
    const stepHor: number = this.sceneSize.gameZoneWidth / 7;
    const stepVer: number = this.sceneSize.gameZoneHeight / 10;
    // Линии по которым будет движени
    for (let i = 0; i < 7; i += 1) {
      const x = i * stepHor + stepHor / 2 + this.sceneSize.gameZoneHorizontalPadding / 2;
      this.add.rectangle(
        x,
        this.sceneSize.gameZoneHeight / 2 + this.sceneSize.headerHeight,
        2,
        this.sceneSize.gameZoneHeight,
        this.rainbowColor[i]
      );
    }
    // линии
    for (let i = 0; i <= 11; i += 1) {
      const y = i * stepVer + stepVer / 2 + this.sceneSize.headerHeight / 4;
      this.add.rectangle(
        this.sceneSize.gameZoneWidth / 2 + this.sceneSize.gameZoneHorizontalPadding / 2,
        y,
        this.sceneSize.gameZoneWidth,
        2,
        0xffffff
      );
    }
  }
}
