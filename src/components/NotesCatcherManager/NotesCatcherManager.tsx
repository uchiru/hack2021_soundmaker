import React from 'react';
import { TAccord } from 'SoundmakerController/types';
import { EPianoNotes } from '../../SoundmakerController/types'
import { NotesCatcher } from './NotesCatcher';
import { testNotes } from '../TestPlayer';

export interface INotesCatcherManager {
    track: TAccord[];
}

export const NotesCatcherManager: React.FC<INotesCatcherManager> = function NotesCathcerManager({track}) {

    const onKeyPress = React.useCallback(() => {
        console.log('key pressed')
    }, []);

    return <div>
        {Object.keys(EPianoNotes).map(note => {
            <NotesCatcher track={testNotes} isColliding={false} />
        })}
    </div>
}