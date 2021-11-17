import React from 'react'
import { SoundmakerControler } from 'SoundmakerController'

export const testNotes = JSON.stringify([
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
  ],
  [
    {
      instrument: 'piano',
      note: 'D'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'C'
    }
  ],
  [
    {
      instrument: 'piano',
      note: 'G'
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
        <button onClick={() => controller.stopPlaying()}>Остановитес</button>
      </div>
    </>
  )
}
