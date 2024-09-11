 // src/components/NoteButtons.tsx
 import React, { useState } from 'react'; // Import useState hook
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
     setEmojiStatus: React.Dispatch<React.SetStateAction<'happy' | 'sad'>>; // Add prop for setting emoji status
 }

 const NoteButtons: React.FC<NoteButtonsProps> = ({
     isPlaying,
     setIsPlaying,
     audioContext,
     noteDuration,
     syllableData,
     currentSyllableIndex,
     setCurrentSyllableIndex,
     setEmojiStatus, // Add prop for setting emoji status
 }) => {
     const handleNoteClick = (noteIndex: number) => {
         const frequency = noteMapping[noteIndex];
         if (audioContext) {
             playSingleNote(audioContext, frequency, audioContext.currentTime, noteDuration);

             if (currentSyllableIndex !== null && currentSyllableIndex < syllableData.length) {
                 const [, correctNoteIndex] = syllableData[currentSyllableIndex];

                 if (noteIndex === correctNoteIndex) {
                     setEmojiStatus('happy'); // Correct note

                     if (currentSyllableIndex === syllableData.length - 1) {
                         setIsPlaying(false);
                         setCurrentSyllableIndex(0);
                     }
                     if (!isPlaying) {
                         setIsPlaying(true);
                     }

                     let newIndex = currentSyllableIndex + 1;
                     while (newIndex < syllableData.length && syllableData[newIndex][1] === -1) {
                         newIndex++;
                     }
                     setCurrentSyllableIndex(newIndex <= syllableData.length ? newIndex : 0);
                 } else {
                     setEmojiStatus('sad'); // Incorrect note
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
                 />
             ))}
         </div>
     );
 };

 export default NoteButtons;