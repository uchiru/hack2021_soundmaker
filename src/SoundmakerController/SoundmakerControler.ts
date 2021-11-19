import { EInstruments, ESampleNotes, ITimeline, TAccord } from './types';
import { ADVANCE_TIME, BPM, MAX_TRACK_SECONDS, TICK_TIME } from './const';

import { pauseSound, play, reset, resumeSound } from './mockPlayer';
import { log } from './logger';

log.level = 1;
const FART = false;

export class SoundmakerControler {
  public track: TAccord[] = [];
  public isError = false;
  public score = 0;

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

  constructor() {
    const samplesPerSecond = BPM / 60;
    this.timeline = {
      sampleTime: Math.floor(1000 / samplesPerSecond),
      samplesPerSecond,
      currentTime: 0
    };
    log(
      'SoundMaker initialized. currentTime = 0, sampleTime = ',
      this.timeline.sampleTime,
      'samplesPerSecond = ',
      samplesPerSecond
    );
    this.handleEvent('currentTimeChange');
  }

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

  public setTrack(track: TAccord[]) {
    this.track = track;
  }

  public setBPM(bpm: number) {
    this.stopPlaying();

    const samplesPerSecond = bpm / 60;
    this.timeline = {
      sampleTime: Math.floor(1000 / samplesPerSecond),
      samplesPerSecond,
      currentTime: 0
    };
    log(
      'SoundMaker initialized. currentTime = 0, sampleTime = ',
      this.timeline.sampleTime,
      'samplesPerSecond = ',
      samplesPerSecond
    );
    this.handleEvent('currentTimeChange');
  }

  private reset() {
    clearInterval(this.interval);
    this.interval = -1;
    this.lastPlayedAccordIndex = -1;
    this.score = 0;
    this.handleEvent('currentScoreChange');
    this.isError = false;
    this.isPaused = false;
    pauseSound();
    reset();
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
    this.reset();
    this.timeline.currentTime = from ?? 0;
    this.handleEvent('currentTimeChange');
    log('starting player from ', from ?? 0);
    this.interval = window.setInterval(() => this.handleTick(), TICK_TIME);
  }

  public stopPlaying() {
    if (this.interval !== -1) {
      this.reset();
      this.timeline.currentTime = 0;
      this.handleEvent('currentTimeChange');
      log('playing stopped');
    }
  }

  public pause() {
    if (!this.isPaused) {
      this.isPaused = true;
      pauseSound();
    }
  }

  public resume() {
    if (this.isPaused) {
      this.isPaused = false;
      resumeSound();
    }
  }

  public resetscore() {
    this.score = 0;
    this.handleEvent('currentScoreChange');
  }

  private handleTick() {
    if (this.isPaused) {
      return;
    }

    const { currentTime } = this.timeline;

    if (currentTime >= MAX_TRACK_SECONDS * 1000) {
      log('stopping and resetting playback because max track time (', MAX_TRACK_SECONDS * 1000, ') elapsed');
      this.stopPlaying();

      return;
    }

    const { accord, index } = this.getAccordToPlayAtTime(currentTime);

    if (accord) {
      if (FART && this.isError && accord.length) {
        accord.push({ instrument: EInstruments.sample, note: ESampleNotes.fart });
      } else {
        this.score++;
        this.handleEvent('currentScoreChange');
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
