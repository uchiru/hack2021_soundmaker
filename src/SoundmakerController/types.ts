export enum EInstruments {
  piano = 'piano',
  drum = 'drum',
  fart = 'fart'
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
  snare = 'snare'
}

export enum EFartNotes {
  epic = 'epic'
}

export type TNotes = EPianoNotes | EDrumNotes | EFartNotes;

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
