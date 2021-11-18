import { log } from './logger';
import { EInstruments, TAccord } from './types';

// class Channel {
//   audio: HTMLAudioElement;
//   constructor(uri: string) {
//     this.audio = new Audio(uri);
//   }
//   public play() {
//     this.audio.play();
//   }
// }

const soundFiles: {
  [key in EInstruments]: Record<string, string>;
} = {
  piano: {
    H: 'https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/B3.mp3?raw=true',
    A: 'https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/A3.mp3?raw=true',
    G: 'https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/G3.mp3?raw=true',
    F: 'https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/F3.mp3?raw=true',
    E: 'https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/E3.mp3?raw=true',
    D: 'https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/D3.mp3?raw=true',
    C: 'https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/C3.mp3?raw=true'
  },
  drum: {},
  fart: {
    epic: 'https://www.soundjay.com/human/fart-01.mp3'
  }
};

export function play(accord: TAccord, volume = 1) {
  accord.forEach((sound) => {
    const audio = new Audio(soundFiles[sound.instrument][sound.note]);
    audio.volume = volume;
    log('mockPlayer playing ', sound.instrument, ' note ', sound.note);
    audio.play();
  });
}
