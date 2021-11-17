import { log } from './logger'
import { EInstruments, TAccord } from './types'

const soundFiles: {
  [EInstruments.piano]: Record<string, HTMLAudioElement>
  [EInstruments.drum]: Record<string, HTMLAudioElement>
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
  drum: {}
}

export function play(accords: TAccord[], accordTime: number) {
  log.prefix('mockPlayer')
  accords.forEach((accord, index) => {
    setTimeout(() => {
      accord.forEach((sound) => {
        log('playing note', sound.note)
        soundFiles[sound.instrument][sound.note].play()
      })
    }, index * accordTime)
  })
}
