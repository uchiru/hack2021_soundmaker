import React from 'react'
import { SoundmakerControler } from 'SoundmakerController'

const testNotes = JSON.stringify([
  [
    {
      instrument: 'piano',
      note: 'H'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'A'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'G'
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
    }
  ]
])

export function TestPlayer() {
  const [textarea, setTextArea] = React.useState(testNotes)
  const controller = React.useMemo(() => new SoundmakerControler(JSON.parse(textarea)), [textarea])

  return (
    <>
      <div>
        <textarea
          value={textarea}
          onChange={(e) => {
            setTextArea(e.target.value)
          }}
          style={{ width: 800, height: 400 }}
        />
      </div>
      <div>
        <button onClick={() => controller.startPlaying()}>Проиграть</button>
        <button disabled={controller.isPlaying} onClick={controller.stopPlaying}>
          Остановитес
        </button>
      </div>
    </>
  )
}
