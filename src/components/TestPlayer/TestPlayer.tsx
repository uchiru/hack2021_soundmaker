import React from 'react'
import { SoundmakerControler } from 'SoundmakerController'
import { MAX_TRACK_SECONDS } from 'SoundmakerController/const'

const testNotes = JSON.stringify([
  [
    {
      instrument: 'piano',
      note: 'A'
    },
    {
      instrument: 'piano',
      note: 'G'
    },
    {
      instrument: 'piano',
      note: 'H'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'A'
    },
    {
      instrument: 'piano',
      note: 'H'
    },
    {
      instrument: 'piano',
      note: 'G'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'G'
    },
    {
      instrument: 'piano',
      note: 'F'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'F'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'E'
    },
    {
      instrument: 'piano',
      note: 'G'
    }
  ]
])

export function TestPlayer() {
  const [textarea, setTextArea] = React.useState(testNotes)
  const [currentProgress, setCurrentProgress] = React.useState(0)
  const controller = React.useMemo(() => {
    let track
    try {
      track = JSON.parse(textarea)
    } catch (e) {}

    return track && new SoundmakerControler(track)
  }, [textarea])

  React.useEffect(() => {
    controller?.on('currentTimeChange', () => {
      setCurrentProgress(Math.floor(controller.currentTime / 1000))
    })
  }, [controller])

  return (
    <>
      <div>
        <textarea
          value={textarea}
          onChange={(e) => {
            setTextArea(e.target.value)
          }}
          style={{ width: 800, height: 400, border: '1px solid', color: controller ? 'black' : 'red' }}
        />
      </div>
      <div>
        {currentProgress}c / {MAX_TRACK_SECONDS}c
      </div>
      <div>
        <button onClick={() => controller?.startPlaying()}>Проиграть</button>
        <button onClick={() => controller?.stopPlaying()}>Остановитес</button>
      </div>
    </>
  )
}
