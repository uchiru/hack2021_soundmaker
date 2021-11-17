import { ITimeline, TAccord } from './types'
import { BPM, MAX_TRACK_SECONDS, TICKRATE } from './const'

import { play } from './mockPlayer'
import { log } from './logger'

log.level = 2

export class SoundmakerControler {
  private interval = -1

  timeline: ITimeline = {
    sampleTime: 1000,
    samplesPerSecond: 1,
    currentTime: 0
  }

  get currentTime() {
    return this.timeline.currentTime
  }

  constructor(public track: TAccord[]) {
    this.initTimeline()
  }

  private eventHandlers: Record<string, Array<() => void>> = {}
  private handleEvent(event: string) {
    this.eventHandlers[event]?.forEach((handler) => handler())
  }
  public on(event: string, cb: () => void) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = []
    }
    this.eventHandlers[event].push(cb)
    return () => {
      this.eventHandlers[event] = this.eventHandlers[event].filter((handler) => handler !== cb)
    }
  }

  private initTimeline() {
    const samplesPerSecond = Math.floor(BPM / 60)
    this.timeline = {
      sampleTime: Math.floor(1000 / samplesPerSecond),
      samplesPerSecond,
      currentTime: 0
    }
    this.handleEvent('currentTimeChange')
    this.eventHandlers = {}
    log(
      'timeline initialized. currentTime = 0, sampleTime = ',
      this.timeline.sampleTime,
      'samplesPerSecond = ',
      samplesPerSecond
    )
  }

  // /** @param time {number} Время в милисекундах */
  // public getNextAccordAtTime(time: number) {
  //   const { sampleTime } = this.timeline
  //   const accordIndex = (time - (time % sampleTime)) / sampleTime
  //   return this.track[accordIndex]
  // }

  private getAccordsAtPeriod(_from: number, _to: number) {
    const { sampleTime } = this.timeline
    const from = Math.round(_from)
    const to = Math.round(_to)
    const firstAccordIndex = (from - (from % sampleTime)) / sampleTime
    const lastAccordIndex = (to - (to % sampleTime)) / sampleTime
    log.verbose(
      'getting accords for period from ',
      from,
      'to',
      to,
      ' : from accord ',
      firstAccordIndex,
      'to accord',
      lastAccordIndex + 1,
      ' : ',
      this.track.slice(firstAccordIndex, lastAccordIndex + 1)
    )
    return this.track.slice(firstAccordIndex, lastAccordIndex + 1)
  }

  /** @param [from] {number} Время начала в милисекундах */
  public startPlaying(from?: number) {
    this.timeline.currentTime = from ?? 0
    this.handleEvent('currentTimeChange')
    log('starting player from ', from ?? 0)
    this.interval = window.setInterval(() => this.handleTick(), 1000 / TICKRATE)
  }

  public stopPlaying() {
    if (this.interval !== -1) {
      clearInterval(this.interval)
      this.interval = -1
      log('playing stopped')
    }
  }

  private handleTick() {
    const { sampleTime, currentTime } = this.timeline

    if (currentTime >= MAX_TRACK_SECONDS * 1000) {
      log('stopping and resetting playback because max track time (', MAX_TRACK_SECONDS * 1000, ') elapsed')
      this.stopPlaying()
      this.timeline.currentTime = 0
      this.handleEvent('currentTimeChange')

      return
    }

    play(this.getAccordsAtPeriod(currentTime, Math.floor(currentTime + 1000 / TICKRATE)), sampleTime)
    this.timeline.currentTime += 1000 / TICKRATE
    this.handleEvent('currentTimeChange')
    log.verbose('set current time to ', this.timeline.currentTime)
  }
}
