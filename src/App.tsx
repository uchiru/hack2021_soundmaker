import React from 'react';
import './App.css';
import { Scene } from './components/Scene';

function App(): JSX.Element {
  return (
    <div className="App">
      <Scene
        onFail={() => console.log('fail')}
        onSuccess={() => console.log('success')}
        onStart={() => console.log('start')}
      />
    </div>
  );
}

export default App;
