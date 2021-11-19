import React from 'react';
import { SoundmakerControler } from 'SoundmakerController';

export const store = {
  soundmakerController: new SoundmakerControler()
};

export const StoreContext = React.createContext(store);
