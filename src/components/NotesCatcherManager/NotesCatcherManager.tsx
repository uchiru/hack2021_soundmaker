import React from 'react';
import { TAccord } from 'SoundmakerController/types';
import { EPianoNotes } from '../../SoundmakerController/types'
import { NotesCatcher } from './NotesCatcher';
import { testNotes } from '../TestPlayer';
import './NotesCatcherManager.css';

export interface INotesCatcherManager {}

export const NotesCatcherManager: React.FC<INotesCatcherManager> = function NotesCathcerManager() {

    React.useEffect(() => {
        document.addEventListener('keydown', onKeyPress);
    }, [])

    const onKeyPress = React.useCallback((e: KeyboardEvent) => {
        console.log(e.key);
    }, []);

    return <div className="notes-catcher-manager">
        {Object.values(EPianoNotes).reverse().map((note) => 
            <NotesCatcher key="note" note={note} isColliding={false} />
        )}
    </div>
}