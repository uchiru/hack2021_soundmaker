import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Scene } from './components/Scene'
import './App.css'
import { TestPlayer } from 'components/TestPlayer'
import { Player } from 'components/Player'

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/test">
            <TestPlayer />
          </Route>
          <Route path="/player">
            <Player />
          </Route>
          <Route path="/">
            <Scene
              onFail={() => console.log('fail')}
              onSuccess={() => console.log('success')}
              onStart={() => console.log('start')}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
