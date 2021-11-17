import React from 'react';
import { TAccord } from 'SoundmakerController/types';
import { EPianoNotes } from '../../../SoundmakerController/types'

export interface INotesCatcher {
    track: TAccord[];
    isColliding: boolean;
}

export const NotesCatcher: React.FC<INotesCatcher> = function NotesCathcer({track}) {
    return <div>
        NotesCatcher
    </div>
}