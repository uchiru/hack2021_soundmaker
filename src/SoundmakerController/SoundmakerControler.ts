import { ITimeline, TAccord } from './types'
import { BPM, TICKRATE } from './const'

import { play } from './mockPlayer'

export class SoundmakerControler {
  private interval?: NodeJS.Timer

  timeline: ITimeline = {
    sampleTime: 1000,
    samplesPerSecond: 1,
    currentTime: 0
  }

  constructor(public notes: TAccord[]) {
    this.initTimeline()
  }

  private initTimeline() {
    const samplesPerSecond = Math.floor(BPM / 60)
    this.timeline = {
      sampleTime: Math.floor(1000 / samplesPerSecond),
      samplesPerSecond,
      currentTime: 0
    }
  }

  // /** @param time {number} Время в милисекундах */
  // public getNextAccordAtTime(time: number) {
  //   const { sampleTime } = this.timeline
  //   const accordIndex = (time - (time % sampleTime)) / sampleTime
  //   return this.notes[accordIndex]
  // }

  private getAccordsAtPeriod(from: number, to: number) {
    const { sampleTime } = this.timeline
    const firstAccordIndex = (from - (from % sampleTime)) / sampleTime
    const lastAccordIndex = (to - (to % sampleTime)) / sampleTime
    return this.notes.slice(firstAccordIndex, lastAccordIndex + 1)
  }

  /** @param [from] {number} Время начала в милисекундах */
  public startPlaying(from?: number) {
    this.timeline.currentTime = from ?? 0
    this.interval = setInterval(() => this.handleTick(), 1000 / TICKRATE)
  }

  public stopPlaying() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  private handleTick() {
    const { sampleTime, currentTime } = this.timeline
    play(this.getAccordsAtPeriod(currentTime, Math.floor(currentTime + 1000 / TICKRATE)), sampleTime)
    this.timeline.currentTime += 1000 / TICKRATE
  }

  get isPlaying() {
    return !!this.interval
  }
}
