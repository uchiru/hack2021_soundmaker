import { Scene } from 'phaser';
export enum ETypeButtons {
  circle = 'circle',
  rect = 'rect'
}
export enum EColorButtons {
  red = 'red',
  green = 'green',
  blue = 'blue'
}

const EColorText: { [key: string]: string } = {
  blue_hover: '#073763',
  blue_normal: '#0C5FAA',
  red_hover: '#660000',
  red_normal: '#990000',
  green_hover: '',
  green_normal: ''
};

const ETextButtons: { [key: string]: string } = {
  start: 'Начать',
  pause: 'Пауза',
  clear: 'С начала',
  back: 'Назад'
};
interface IButtonPosition {
  x: number;
  y: number;
}
interface IButtonPositionTextShift {
  [key: string]: {
    x: number;
    y: number;
  };
}
export class Button {
  game: Scene;
  private readonly type: ETypeButtons;
  private readonly color: EColorButtons;
  private readonly spriteKey: string;
  private readonly text: string;
  private gameObject?: Phaser.GameObjects.Image;
  private phaserText?: Phaser.GameObjects.Text;
  private readonly buttonPosition: IButtonPosition;
  private buttonPositionTextShift: IButtonPositionTextShift;
  private name: keyof typeof ETextButtons;
  private isPressed: boolean;
  private readonly handleClick: () => void;
  constructor(
    game: Scene,
    type: ETypeButtons,
    color: EColorButtons,
    textType: keyof typeof ETextButtons,
    buttonPosition: IButtonPosition,
    handleClick: () => void
  ) {
    this.game = game;
    this.color = color;
    this.type = type;
    this.text = ETextButtons[textType];
    this.name = textType;
    this.spriteKey = `button_${this.type}-${this.color}`;
    this.buttonPositionTextShift = {
      start: {
        x: 46,
        y: 30
      },
      back: {
        x: 46,
        y: 30
      }
    };
    this.buttonPosition = buttonPosition;
    this.isPressed = false;
    this.handleClick = handleClick;
    this.render();
  }

  render() {
    const { x, y } = this.buttonPosition;
    this.gameObject = this.game.add
      .image(x, y, 'buttons', `${this.spriteKey}_normal`)
      .setScale(0.2, 0.2)
      .setInteractive();
    this.gameObject.on('pointerdown', this.onPress, this);
    this.gameObject.on('pointerup', this.onHover, this);
    this.gameObject.on('pointerover', this.onHover, this);
    this.gameObject.on('pointerout', this.onDrop, this);

    const textX = x - this.buttonPositionTextShift[this.name].x;
    const textY = y - this.buttonPositionTextShift[this.name].y;
    this.phaserText = this.game.add.text(textX, textY, this.text, {
      font: '25px Arial Black',
      color: `${EColorText[`${this.color}_normal`]}`
    });
  }

  onHover() {
    if (this.isPressed) {
      this.isPressed = false;
      this.moveUp();
    }
    this.gameObject?.setTexture('buttons', `${this.spriteKey}_hovered`);
    this.phaserText?.setColor(`${EColorText[`${this.color}_hover`]}`);
  }

  onPress() {
    if (!this.isPressed) {
      this.isPressed = true;
      this.moveDown();
    }
    this.gameObject?.setTexture('buttons', `${this.spriteKey}_pressed`);
    this.handleClick();
  }
  moveDown() {
    const { x, y } = this.buttonPosition;
    const textX = x - this.buttonPositionTextShift[this.name].x;
    const textY = y - this.buttonPositionTextShift[this.name].y;
    this.gameObject?.setPosition(x, y + 7);
    this.phaserText?.setPosition(textX, textY + 12);
  }
  moveUp() {
    const { x, y } = this.buttonPosition;
    const textX = x - this.buttonPositionTextShift[this.name].x;
    const textY = y - this.buttonPositionTextShift[this.name].y;
    this.gameObject?.setPosition(x, y);
    this.phaserText?.setPosition(textX, textY);
  }
  onDrop() {
    if (this.isPressed) {
      this.isPressed = false;
      this.moveUp();
    }
    this.gameObject?.setTexture('buttons', `${this.spriteKey}_normal`);
    this.phaserText?.setColor(`${EColorText[`${this.color}_normal`]}`);
  }
}
