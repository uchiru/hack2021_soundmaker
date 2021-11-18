import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Scene } from './components/Scene'
import './App.css'
import { TestPlayer } from 'components/TestPlayer'
import { Player } from 'components/Player'
import { preload } from 'SoundmakerController/mockPlayer';


function App(): JSX.Element {
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    preload(() => setIsLoaded(true));
  }, []);

  return (
    <div className="App">
      {!isLoaded ? (
        <img src="https://uchiru-five-eleven.s3.eu-central-1.amazonaws.com/common/52dcf1b02b4a9c7a01223f6c2e7334c03d6f5653156798218505e4d47c7afff1.gif" />
      ) : (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/test">
              <TestPlayer />
            </Route>
            <Route path="/scene">
              <Scene
                onFail={() => console.log('fail')}
                onSuccess={() => console.log('success')}
                onStart={() => console.log('start')}
              />
            </Route>
            <Route path="/player">
              <Player />
            </Route>
            <Route path="/">nothing to see here</Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
