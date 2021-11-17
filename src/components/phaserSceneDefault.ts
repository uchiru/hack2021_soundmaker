export default class phaserSceneDefault extends Phaser.Scene {
  preload() {
    console.log('defaultScene preload', this);
  }
  create() {
    const footerHeight = 200;
    const headerHeight = 100;
    const footerWidth: number = this.scale.width;
    const gameZoneWidth: number = (this.scale.width % 7) * 700;
    const gameZoneHeight: number = this.scale.height - footerHeight - headerHeight;
    const gameZoneHorizontalPadding: number = this.scale.width - gameZoneWidth;
    // Условная верхнячя панель
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
      0xadadad
    );
    // Условная нижняя панель
    this.add.rectangle(
      footerWidth / 2 ,
      this.scale.height - footerHeight / 2,
      footerWidth,
      footerHeight,
      0xff0000
    );
  }
}
