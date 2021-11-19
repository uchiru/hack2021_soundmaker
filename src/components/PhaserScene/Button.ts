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

export const EColorText: { [key: string]: string } = {
  blue_hover: '#073763',
  blue_normal: '#0C5FAA',
  red_hover: '#660000',
  red_normal: '#990000',
  green_hover: '#38761D',
  green_normal: '#172E0B'
};

const ETextButtons: { [key: string]: string } = {
  start: 'Начать',
  pause: 'Пауза',
  clear: 'С начала',
  back: 'Выход',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7'
};
const EKeyCodes: { [key: string]: string } = {
  '1': 'ONE',
  '2': 'TWO',
  '3': 'THREE',
  '4': 'FOUR',
  '5': 'FIVE',
  '6': 'SIX',
  '7': 'SEVEN',
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
  public name: keyof typeof ETextButtons;
  private isPressed: boolean;
  private readonly handleClick: () => void;
  private readonly actionType: 'mouse' | 'keyboard';
  constructor(
    game: Scene,
    type: ETypeButtons,
    color: EColorButtons,
    textType: keyof typeof ETextButtons,
    buttonPosition: IButtonPosition,
    actionType: 'mouse' | 'keyboard',
    handleClick: () => void
  ) {
    this.game = game;
    this.color = color;
    this.type = type;
    this.text = ETextButtons[textType];
    this.name = textType;
    this.actionType = actionType;
    this.spriteKey = `button_${this.type}-${this.color}`;
    this.buttonPositionTextShift = {
      start: {
        x: 46,
        y: 30
      },
      back: {
        x: 46,
        y: 30
      },
      pause: {
        x: 40,
        y: 30
      },
      clear: {
        x: 65,
        y: 30
      },
      1: {
        x: 9,
        y: 15
      },
      2: {
        x: 9,
        y: 15
      },
      3: {
        x: 9,
        y: 15
      },
      4: {
        x: 9,
        y: 15
      },
      5: {
        x: 9,
        y: 15
      },
      6: {
        x: 9,
        y: 15
      },
      7: {
        x: 9,
        y: 15
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
      .image(x, y, 'buttons', `${this.spriteKey}_normal.png`)
      .setScale(0.2, 0.2)
      .setInteractive()
      .setDepth(1);
    if (this.actionType === 'mouse') {
      this.gameObject.on('pointerdown', this.onPress, this);
      this.gameObject.on('pointerup', this.onHover, this);
      this.gameObject.on('pointerover', this.onHover, this);
      this.gameObject.on('pointerout', this.onDrop, this);
    } else {
      this.game.input.keyboard.once(`keydown-${EKeyCodes[this.text]}`, this.onPress, this);
      this.game.input.keyboard.on(`keyup-${EKeyCodes[this.text]}`, this.onDrop, this);
    }

    const textX = x - this.buttonPositionTextShift[this.name].x;
    const textY = y - this.buttonPositionTextShift[this.name].y;
    this.phaserText = this.game.add
      .text(textX, textY, this.text, {
        font: '25px Arial Black',
        color: `${EColorText[`${this.color}_normal`]}`
      })
      .setDepth(3);
  }

  onHover() {
    if (this.isPressed) {
      this.isPressed = false;
      this.moveUp();
    }
    this.gameObject?.setTexture('buttons', `${this.spriteKey}_hovered.png`);
    this.phaserText?.setColor(`${EColorText[`${this.color}_hovered`]}`);
  }

  onPress() {
    if (!this.isPressed) {
      this.isPressed = true;
      this.moveDown();
    }
    this.gameObject?.setTexture('buttons', `${this.spriteKey}_pressed.png`);
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
    if (this.actionType === 'keyboard') this.game.input.keyboard.once(`keydown-${EKeyCodes[this.text]}`, this.onPress, this);
    this.gameObject?.setTexture('buttons', `${this.spriteKey}_normal.png`);
    this.phaserText?.setColor(`${EColorText[`${this.color}_normal`]}`);
  }
  changeButton(newText: string) {
    this.name = newText;
    const { x, y } = this.buttonPosition;
    const textX = x - this.buttonPositionTextShift[this.name].x;
    const textY = y - this.buttonPositionTextShift[this.name].y;
    this.phaserText?.setText(ETextButtons[this.name]).setPosition(textX, textY);
    this.moveDown();
  }
}
