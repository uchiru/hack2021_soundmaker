import { log } from './logger';
import { EInstruments, TAccord } from './types';

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
  drum: {
    kick: 'https://uchiru-five-eleven.s3.eu-central-1.amazonaws.com/common/2419910dc6d7fbaa692f8d0bf7bdd443c711dc22129becceb8403e0f0d79b9fe.mp3',
    snare:
      'https://uchiru-five-eleven.s3.eu-central-1.amazonaws.com/common/8c9303e63e75bfdd45dfd04a3c60fa28fe477991b6959bf2a283765d9c075fba.mp3',
    cymbal:
      'https://uchiru-five-eleven.s3.eu-central-1.amazonaws.com/common/a693c05b9b4086f111add7d3104017b7c1083611b47028023da6745221e0e494.mp3'
  },
  sample: {
    fart: 'https://www.soundjay.com/human/fart-01.mp3',
    wtf2: 'https://d9olupt5igjta.cloudfront.net/samples/sample_files/21485/04bf2f8cd18ccecf5f76c2d5f9fa2c75f2a3f5fd/mp3/_Charlie_Bloop_Noise.mp3',
    wtf: 'https://d9olupt5igjta.cloudfront.net/samples/sample_files/72393/fd50470d6f8ac5cfe5b9dba86552c5e59ac07181/mp3/_New_Project_-_looperman-a-1198802-0006027-tintddubstep-drop-the-bass.mp3.mp3',
    yeah: 'https://d9olupt5igjta.cloudfront.net/samples/sample_files/100378/c55ffd12a6d822023d742348597f8ebc4d178e38/mp3/_E-Yeah.mp3',
    ambient:
      'https://d9olupt5igjta.cloudfront.net/samples/sample_files/102350/d72b0205892d968592208c5719ea7b96e955fa42/mp3/_1STREETWISEGHOSTCHOIR.mp3'
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
