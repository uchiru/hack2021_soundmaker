import { EInstruments, ESampleNotes, ITimeline, TAccord } from './types';
import { ADVANCE_TIME, BPM, MAX_TRACK_SECONDS, TICK_TIME } from './const';

import { pauseSound, play, reset, resumeSound } from './mockPlayer';
import { log } from './logger';

log.level = 1;
const FART = true;

export class SoundmakerControler {
  private interval = -1;
  private lastPlayedAccordIndex = -1;
  private isPaused = false;

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
    reset();
    log(
      'timeline initialized. currentTime = 0, sampleTime = ',
      this.timeline.sampleTime,
      'samplesPerSecond = ',
      samplesPerSecond
    );
  }

  private getAccordToPlayAtTime(time: number) {
    const { sampleTime } = this.timeline;

    let accord = null;

    const nextAccordIndex = Math.ceil((time - (time % sampleTime)) / sampleTime);

    if (sampleTime - (time % sampleTime) <= ADVANCE_TIME) {
      if (this.lastPlayedAccordIndex >= nextAccordIndex) {
        log.verbose('skip because accord alrready played (', nextAccordIndex, ')');
      } else {
        accord = this.track[nextAccordIndex];
      }
    }

    log.verbose('got accord for time ', time, ': ', accord);

    return {
      accord,
      index: nextAccordIndex
    };
  }

  /** @param [from] {number} Время начала в милисекундах */
  public startPlaying(from?: number) {
    if (this.isPaused) {
      this.resume();
    } else {
      this.timeline.currentTime = from ?? 0;
      this.lastPlayedAccordIndex = -1;
      this.handleEvent('currentTimeChange');
      log('starting player from ', from ?? 0);
      this.interval = window.setInterval(() => this.handleTick(), TICK_TIME);
    }
  }

  public stopPlaying() {
    if (this.interval !== -1) {
      clearInterval(this.interval);
      this.interval = -1;
      log('playing stopped');
    }
  }

  public pause() {
    this.isPaused = true;
    pauseSound();
  }

  public resume() {
    this.isPaused = false;
    resumeSound();
  }

  private handleTick() {
    if (this.isPaused) {
      return;
    }

    const { currentTime } = this.timeline;

    if (currentTime >= MAX_TRACK_SECONDS * 1000) {
      log('stopping and resetting playback because max track time (', MAX_TRACK_SECONDS * 1000, ') elapsed');
      this.stopPlaying();
      this.timeline.currentTime = 0;
      this.lastPlayedAccordIndex = -1;
      this.handleEvent('currentTimeChange');
      reset();

      return;
    }

    const { accord, index } = this.getAccordToPlayAtTime(currentTime);

    if (accord) {
      if (FART && this.isError && accord.length) {
        accord.push({ instrument: EInstruments.sample, note: ESampleNotes.fart });
      }

      play(accord, this.isError ? 0.3 : 1);

      this.lastPlayedAccordIndex = index;
      log.verbose('set lastPlayedAccordIndex to ', this.lastPlayedAccordIndex);
    }

    this.timeline.currentTime += TICK_TIME;
    this.handleEvent('currentTimeChange');

    log.verbose('set current time to ', this.timeline.currentTime);
  }
}
