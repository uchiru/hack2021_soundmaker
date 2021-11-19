import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Scene } from './components/PhaserScene/Scene';
import './App.css';
import { TestPlayer } from 'components/TestPlayer';
import { Player } from 'components/Player';
import { preload } from 'SoundmakerController/mockPlayer';
import { Intro } from 'components/Intro';
import { store, StoreContext } from 'storeContext';

function App(): JSX.Element {
  const [isLoaded, setIsLoaded] = React.useState(false);
  React.useEffect(() => {
    preload(() => setIsLoaded(true));
  }, []);

  return (
    <div className="App">
      <StoreContext.Provider value={store}>
        {!isLoaded ? (
          <div className="preloader">
            <img src="https://uchiru-five-eleven.s3.eu-central-1.amazonaws.com/common/52dcf1b02b4a9c7a01223f6c2e7334c03d6f5653156798218505e4d47c7afff1.gif" />
          </div>
        ) : (
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route path="/test">
                <TestPlayer />
              </Route>
              <Route path="/scene">
                <Scene />
              </Route>
              <Route path="/player">
                <Player />
              </Route>
              <Route path="/">
                <Intro />
              </Route>
            </Switch>
          </BrowserRouter>
        )}
      </StoreContext.Provider>
    </div>
  );
}

export default App;
