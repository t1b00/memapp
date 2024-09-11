// src/components/NoteButtons.tsx
import React from 'react';
import playSingleNote from '../utils/playSingleNote';
import colorMapping from '../utils/colorMapping';
import noteMapping from '../utils/noteMapping';
import './NoteButtons.css';

interface NoteButtonsProps {
  audioContext: AudioContext;
  startTime: number;
  noteDuration: number;
}

const NoteButtons: React.FC<NoteButtonsProps> = ({ audioContext, startTime, noteDuration }) => {
  const handleNoteClick = (noteIndex: number) => {
    const frequency = noteMapping[noteIndex];
    if (audioContext) {
      console.log(`Note button clicked: ${noteIndex}, Frequency: ${frequency}`);
      playSingleNote(audioContext, frequency, audioContext.currentTime, noteDuration);
    } else {
      console.error("Audio context is not initialized.");
    }
  };

  return (
    <div className="note-buttons">
      {Object.keys(colorMapping).map((key) => (
        <button
          key={key}
          className={`note-button ${colorMapping[parseInt(key)]}`}
          onClick={() => handleNoteClick(parseInt(key))}
          // Remove inline style - already done with CSS
        >
        </button>
      ))}
    </div>
  );
};

export default NoteButtons;