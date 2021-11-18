import { EInstruments, ESampleNotes, ITimeline, TAccord } from './types';
import { BPM, MAX_TRACK_SECONDS, TICK_TIME } from './const';

import { play } from './mockPlayer';
import { log } from './logger';

log.level = 2;
const FART = true;

export class SoundmakerControler {
  private interval = -1;
  private lastPlayedAccordIndex = -1;

  timeline: ITimeline = {
    sampleTime: 1000,
    samplesPerSecond: 1,
    currentTime: 0
  };

  get currentTime() {
    return this.timeline.currentTime;
  }

  constructor(public track: TAccord[]) {
    this.initTimeline();
  }

  public isError = false;

  private eventHandlers: Record<string, Array<() => void>> = {};
  private handleEvent(event: string) {
    this.eventHandlers[event]?.forEach((handler) => handler());
  }
  public on(event: string, cb: () => void) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(cb);
    return () => {
      this.eventHandlers[event] = this.eventHandlers[event].filter((handler) => handler !== cb);
    };
  }

  private initTimeline() {
    const samplesPerSecond = Math.floor(BPM / 60);
    this.timeline = {
      sampleTime: Math.floor(1000 / samplesPerSecond),
      samplesPerSecond,
      currentTime: 0
    };
    this.handleEvent('currentTimeChange');
    this.eventHandlers = {};
    this.lastPlayedAccordIndex = -1;
    log(
      'timeline initialized. currentTime = 0, sampleTime = ',
      this.timeline.sampleTime,
      'samplesPerSecond = ',
      samplesPerSecond
    );
  }

  private getAccordToPlayAtTime(time: number) {
    const { sampleTime } = this.timeline;
    const nextAccordIndex = Math.ceil((time - (time % sampleTime)) / sampleTime);

    let accord;

    if (this.lastPlayedAccordIndex >= nextAccordIndex) {
      log.verbose('skip because accord alrready played (', nextAccordIndex, ')');
      accord = null;
    } else {
      accord = this.track[nextAccordIndex];
    }

    log.verbose('getting accord for time ', time, ' from index ', nextAccordIndex, ': ', accord);

    return {
      accord,
      index: nextAccordIndex
    };
  }

  /** @param [from] {number} Время начала в милисекундах */
  public startPlaying(from?: number) {
    this.timeline.currentTime = from ?? 0;
    this.lastPlayedAccordIndex = -1;
    this.handleEvent('currentTimeChange');
    log('starting player from ', from ?? 0);
    this.interval = window.setInterval(() => this.handleTick(), TICK_TIME);
  }

  public stopPlaying() {
    if (this.interval !== -1) {
      clearInterval(this.interval);
      this.interval = -1;
      log('playing stopped');
    }
  }

  private handleTick() {
    const { currentTime } = this.timeline;

    if (currentTime >= MAX_TRACK_SECONDS * 1000) {
      log('stopping and resetting playback because max track time (', MAX_TRACK_SECONDS * 1000, ') elapsed');
      this.stopPlaying();
      this.timeline.currentTime = 0;
      this.lastPlayedAccordIndex = -1;
      this.handleEvent('currentTimeChange');

      return;
    }

    const { accord, index } = this.getAccordToPlayAtTime(currentTime);

    if (accord) {
      if (FART && this.isError && accord.length) {
        accord.push({ instrument: EInstruments.sample, note: ESampleNotes.fart });
      }

      play(accord, this.isError ? 0.3 : 1);
    }

    this.lastPlayedAccordIndex = index;
    log.verbose('set lastPlayedAccordIndex to ', this.lastPlayedAccordIndex);

    this.timeline.currentTime += TICK_TIME;
    this.handleEvent('currentTimeChange');

    log.verbose('set current time to ', this.timeline.currentTime);
  }
}
