// src/utils/playNotes.ts
import noteMapping from './noteMapping';
import appConfig from '../config';
import playSingleNote from './playSingleNote';

const playNotes = (
  syllableData: [string, number][],
  setCurrentSyllableIndex: React.Dispatch<React.SetStateAction<number | null>>,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  audioContext: AudioContext | null
) => {
  if (!audioContext) {
    console.error('AudioContext is null');
    return;
  }

  const noteDuration = 60 / appConfig.defaultTempo; // duration of each note in seconds
  setIsPlaying(true); // Set isPlaying to true when music starts

  const playNextNote = (index: number) => {
    if (index >= syllableData.length) {
      setIsPlaying(false); // Set isPlaying to false when music finishes
      return;
    }

    const [syllable, number] = syllableData[index];
    if (syllable.trim() === '') {
      playNextNote(index + 1); // Skip whitespace syllables
      return;
    }

    // Validate number and noteMapping[number]
    if (typeof number !== 'number' || !isFinite(number)) {
      console.error(`Invalid number: ${number}`);
      playNextNote(index + 1);
      return;
    }

    const frequency = noteMapping[number];
    if (typeof frequency !== 'number' || !isFinite(frequency)) {
      console.error(`Invalid frequency for number ${number}: ${frequency}`);
      playNextNote(index + 1);
      return;
    }

    playSingleNote(audioContext, frequency, audioContext.currentTime, noteDuration);
    setCurrentSyllableIndex(index);

    setTimeout(() => {
      setCurrentSyllableIndex(0); // Reset current syllable to the beginning
      playNextNote(index + 1); // Schedule the next note
    }, noteDuration * 1000);
  };

  playNextNote(0); // Start playing the first note
};

export default playNotes;