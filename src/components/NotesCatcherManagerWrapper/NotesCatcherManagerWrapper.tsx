import React from 'react';
import { TAccord } from 'SoundmakerController/types';
import { EPianoNotes } from '../../SoundmakerController/types'
import { NotesCatcher } from './NotesCatcher';
import './NotesCatcherManagerWrapper.css';

export interface INotesCatcherManagerWrapper {}

export const NotesCatcherManager: React.FC<INotesCatcherManagerWrapper> = function NotesCathcerManagerWrapper() {

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