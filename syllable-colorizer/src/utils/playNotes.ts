// src/playNotes.ts
import noteMapping from '../noteMapping';
import appConfig from '../config';

const playNotes = (
  syllableData: [string, number][],
  setCurrentSyllableIndex: React.Dispatch<React.SetStateAction<number | null>>,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  let startTime = audioContext.currentTime;
  const noteDuration = 60 / appConfig.tempo; // duration of each note in seconds

  setIsPlaying(true); // Set isPlaying to true when music starts

  syllableData.forEach(([syllable, number], index) => {
    if (syllable.trim() === '') {
      return; // Skip whitespace syllables
    }

    // Validate number and noteMapping[number]
    if (typeof number !== 'number' || !isFinite(number)) {
      console.error(`Invalid number: ${number}`);
      return;
    }

    const frequency = noteMapping[number];
    if (typeof frequency !== 'number' || !isFinite(frequency)) {
      console.error(`Invalid frequency for number ${number}: ${frequency}`);
      return;
    }

    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + noteDuration);

    setTimeout(() => {
      setCurrentSyllableIndex(index);
    }, (startTime - audioContext.currentTime) * 1000);

    setTimeout(() => {
      setCurrentSyllableIndex(null);
    }, (startTime + noteDuration - audioContext.currentTime) * 1000);

    startTime += noteDuration; // Increment start time only for non-whitespace syllables
  });

  // Set isPlaying to false when music finishes
  setTimeout(() => {
    setIsPlaying(false);
  }, (startTime - audioContext.currentTime) * 1000);
};

export default playNotes;