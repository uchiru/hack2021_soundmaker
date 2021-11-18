import React from 'react';
import { MAX_TRACK_SECONDS } from 'SoundmakerController/const';
import { StoreContext } from 'storeContext';
import testnotes from './testnotes';
// import {notes} from '../Player/notes';

const testNotes = JSON.stringify(testnotes);

export function TestPlayer() {
  const { soundmakerController: controller } = React.useContext(StoreContext);
  const [textarea, setTextArea] = React.useState(testNotes);
  const [currentProgress, setCurrentProgress] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const isError = React.useMemo(() => {
    let track;
    try {
      track = JSON.parse(textarea);
    } catch (e) {}

    if (track) {
      controller.setTrack(track);
    }

    return !!track;
  }, [textarea]);

  React.useEffect(() => {
    controller?.on('currentTimeChange', () => {
      setCurrentProgress(Math.floor(controller.currentTime / 1000));
    });
  }, [controller]);

  return (
    <>
      <div>
        <textarea
          value={textarea}
          onChange={(e) => {
            setTextArea(e.target.value);
          }}
          style={{ width: 800, height: 400, border: '1px solid', color: isError ? 'black' : 'red' }}
        />
      </div>
      <div style={{ color: 'white' }}>
        {currentProgress}c / {MAX_TRACK_SECONDS}c
      </div>
      <div style={{ color: 'white' }}>
        <input
          type="checkbox"
          onChange={(e) => {
            if (controller) {
              controller.isError = e.target.checked;
            }
          }}
        />
        Ошибка
      </div>
      <div style={{ color: 'white' }}>
        <button onClick={() => controller?.startPlaying()}>▶️</button>
        <button
          onClick={() => {
            if (isPaused) {
              setIsPaused(false);
              controller?.resume();
            } else {
              setIsPaused(true);
              controller?.pause();
            }
          }}
        >
          ⏯️
        </button>
        <button onClick={() => controller?.stopPlaying()}>⏹️</button>
      </div>
    </>
  );
}
