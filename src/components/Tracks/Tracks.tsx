import React from 'react';
import './Tracks.css';

export function Tracks() {
  return (
    <>
      <div className="tracks instrument-tracks">
        <div>си (H)</div>
        <div>ля (A)</div>
        <div>соль (G)</div>
        <div>фа (F)</div>
        <div>ми (E)</div>
        <div>ре (D)</div>
        <div>до (C)</div>
      </div>
      <div className="tracks beat-tracks">
        <div>kick</div>
        <div>snare</div>
        <div>cymbal</div>
      </div>
    </>
  );
}
