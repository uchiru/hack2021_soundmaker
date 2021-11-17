import React from 'react'
import { SoundmakerControler } from 'SoundmakerController'
import { Scene } from './components/Scene'
import './App.css'

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
      <Scene
        onFail={() => console.log('fail')}
        onSuccess={() => console.log('success')}
        onStart={() => console.log('start')}
      />
    </div>
  );
}

export default App;
