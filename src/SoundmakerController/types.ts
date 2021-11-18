export enum EInstruments {
  piano = 'piano',
  drum = 'drum',
  sample = 'sample'
}

export enum EPianoNotes {
  H = 'H',
  A = 'A',
  G = 'G',
  F = 'F',
  E = 'E',
  D = 'D',
  C = 'C'
}

export enum EDrumNotes {
  kick = 'kick',
  cymbal = 'cymbal',
  snare = 'snare'
}

export enum ESampleNotes {
  fart = 'fart',
  wtf2 = 'wtf2',
  wtf = 'wtf',
  yeah = 'yeah',
  ambient = 'ambient'
}

export type TNotes = EPianoNotes | EDrumNotes | ESampleNotes;

export interface ISound {
  instrument: EInstruments;
  note: TNotes;
  isPlayed?: boolean;
}

export type TAccord = ISound[];

export interface ITimeline {
  sampleTime: number;
  samplesPerSecond: number;
  currentTime: number;
}
