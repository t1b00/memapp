import React from 'react';
import playSingleNote from '../utils/playSingleNote';
import colorMapping from '../utils/colorMapping';
import noteMapping from '../utils/noteMapping';
import './NoteButtons.css';

interface NoteButtonsProps {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioContext: AudioContext;
  noteDuration: number;
  syllableData: [string, number][];
  currentSyllableIndex: number | null;
  setCurrentSyllableIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const NoteButtons: React.FC<NoteButtonsProps> = ({
  isPlaying,
  setIsPlaying,
  audioContext,
  noteDuration,
  syllableData,
  currentSyllableIndex,
  setCurrentSyllableIndex,
}) => {
  const handleNoteClick = (noteIndex: number) => {
    const frequency = noteMapping[noteIndex];
    if (audioContext) {
      playSingleNote(audioContext, frequency, audioContext.currentTime, noteDuration);

      // Check if the clicked note is the correct one
      if (currentSyllableIndex !== null && currentSyllableIndex < syllableData.length) {
        const [, correctNoteIndex] = syllableData[currentSyllableIndex];
        if (noteIndex === correctNoteIndex) {
          if (currentSyllableIndex === syllableData.length - 1) {
            setIsPlaying(false);
            setCurrentSyllableIndex(0);
          }
          
          if (!isPlaying) {
            setIsPlaying(true);
          }

          let newIndex = currentSyllableIndex + 1;

          // Increment the index while the current syllable is -1
          while (newIndex < syllableData.length && syllableData[newIndex][1] === -1) {
            newIndex++;
          }

          setCurrentSyllableIndex(newIndex <= syllableData.length ? newIndex : 0);
        }
      }
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
        >
        </button>
      ))}
    </div>
  );
};

export default NoteButtons;