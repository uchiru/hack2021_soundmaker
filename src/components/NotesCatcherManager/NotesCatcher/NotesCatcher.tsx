import React from 'react';
import { TAccord, TNotes } from 'SoundmakerController/types';
import { EPianoNotes } from '../../../SoundmakerController/types'

export interface INotesCatcher {
    isColliding: boolean;
    note: TNotes
}

export const NotesCatcher: React.FC<INotesCatcher> = function NotesCathcer({isColliding, note}) {
    return <div>
        <div>{note}</div>
    </div>
}