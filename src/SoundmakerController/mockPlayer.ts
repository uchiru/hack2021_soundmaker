import { log } from './logger';
import { EInstruments, TAccord } from './types';

const soundFiles: {
  [key in EInstruments]: Record<string, HTMLAudioElement>;
} = {
  piano: {
    H: new Audio('https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/B3.mp3?raw=true'),
    A: new Audio('https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/A3.mp3?raw=true'),
    G: new Audio('https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/G3.mp3?raw=true'),
    F: new Audio('https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/F3.mp3?raw=true'),
    E: new Audio('https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/E3.mp3?raw=true'),
    D: new Audio('https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/D3.mp3?raw=true'),
    C: new Audio('https://github.com/fuhton/piano-mp3/blob/master/piano-mp3/C3.mp3?raw=true')
  },
  drum: {
    kick: new Audio(
      'https://uchiru-five-eleven.s3.eu-central-1.amazonaws.com/common/2419910dc6d7fbaa692f8d0bf7bdd443c711dc22129becceb8403e0f0d79b9fe.mp3'
    ),
    snare: new Audio(
      'https://uchiru-five-eleven.s3.eu-central-1.amazonaws.com/common/8c9303e63e75bfdd45dfd04a3c60fa28fe477991b6959bf2a283765d9c075fba.mp3'
    ),
    cymbal: new Audio(
      'https://uchiru-five-eleven.s3.eu-central-1.amazonaws.com/common/a693c05b9b4086f111add7d3104017b7c1083611b47028023da6745221e0e494.mp3'
    )
  },
  sample: {
    fart: new Audio('https://www.soundjay.com/human/fart-01.mp3'),
    wtf2: new Audio(
      'https://d9olupt5igjta.cloudfront.net/samples/sample_files/21485/04bf2f8cd18ccecf5f76c2d5f9fa2c75f2a3f5fd/mp3/_Charlie_Bloop_Noise.mp3'
    ),
    wtf: new Audio(
      'https://d9olupt5igjta.cloudfront.net/samples/sample_files/72393/fd50470d6f8ac5cfe5b9dba86552c5e59ac07181/mp3/_New_Project_-_looperman-a-1198802-0006027-tintddubstep-drop-the-bass.mp3.mp3'
    ),
    yeah: new Audio(
      'https://d9olupt5igjta.cloudfront.net/samples/sample_files/100378/c55ffd12a6d822023d742348597f8ebc4d178e38/mp3/_E-Yeah.mp3'
    ),
    ambient: new Audio(
      'https://d9olupt5igjta.cloudfront.net/samples/sample_files/102350/d72b0205892d968592208c5719ea7b96e955fa42/mp3/_1STREETWISEGHOSTCHOIR.mp3'
    )
  }
};

let samplesCount = 0;
let loadedCount = 0;
let loadedCb: () => void;

function loadedAudio(e: Event) {
  loadedCount++;
  log.verbose('mockPlayer loadedCount = ', loadedCount);
  (e.target as HTMLAudioElement).pause();
  if (loadedCount === samplesCount) {
    log('mockPlayer loaded all sounds');
    loadedCb?.();
  }
}

export function preload(cb?: () => void) {
  if (cb) {
    loadedCb = cb;
  }
  Object.values(soundFiles).forEach((samples) => {
    Object.values(samples).forEach((audio) => {
      log.verbose('mockPlayer start loading sample #' + samplesCount);
      samplesCount++;
      audio.muted = true;
      audio.autoplay = true;
      audio.addEventListener('canplaythrough', loadedAudio, false);
    });
  });
}

let id = 1;
let playingSounds: { [key: string]: HTMLAudioElement } = {};

function removePlayingAudio(e: Event) {
  const audio = e.target as HTMLAudioElement;
  log('mockPlayer removePlayingAudio' + audio);
  audio.removeEventListener('ended', removePlayingAudio, false);
  delete playingSounds[audio.id];
}

export function play(accord: TAccord, globalVolume = 1) {
  accord.forEach((sound) => {
    const audio = new Audio(soundFiles[sound.instrument][sound.note].src);
    audio.volume = globalVolume * (sound.volume ?? 1);
    log('mockPlayer playing ', sound.instrument, ' note ', sound.note);
    audio.play();
    audio.id = `__mock-player-${id++}`;
    playingSounds[audio.id] = audio;
    audio.addEventListener('ended', removePlayingAudio, false);
  });
}

let pausedSounds: HTMLAudioElement[] = [];

export function pauseSound() {
  Object.values(playingSounds).forEach((playingSound) => {
    pausedSounds.push(playingSound);
    playingSound.pause();
    log.verbose('mockPlayer pausing sound');
  });
}

export function resumeSound() {
  log.verbose('resuming this sounds:', pausedSounds);
  pausedSounds.forEach((playingSound) => playingSound.play());
  pausedSounds = [];
}

export function reset() {
  playingSounds = {};
  pausedSounds = [];
}
