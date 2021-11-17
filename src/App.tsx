import React from 'react'
import logo from './logo.svg'
import './App.css'
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

function App(): JSX.Element {
  const [textarea, setTextArea] = React.useState(testNotes)
  const controller = React.useMemo(() => new SoundmakerControler(JSON.parse(textarea)), [textarea])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <textarea
            value={textarea}
            onChange={(e) => {
              console.log(e)
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
      </header>
    </div>
  )
}

export default App
