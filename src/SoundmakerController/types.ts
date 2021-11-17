export enum EInstruments {
  piano = 'piano',
  drum = 'drum'
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

export type TNotes = EPianoNotes | EDrumNotes

export interface ISound {
  instrument: EInstruments
  note: TNotes
}

export type TAccord = ISound[]

export interface ITimeline {
  sampleTime: number
  samplesPerSecond: number
  currentTime: number
}
