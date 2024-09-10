import noteMapping from './noteMapping';
import appConfig from './config';

const playNotes = (
  syllableData: [string, number][],
  setCurrentSyllableIndex: React.Dispatch<React.SetStateAction<number | null>>
) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  let startTime = audioContext.currentTime;
  const noteDuration = 60 / appConfig.tempo; // duration of each note in seconds

  syllableData.forEach(([syllable, number], index) => {
    if (syllable.trim() === '') {
      return; // Skip whitespace syllables
    }

    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(noteMapping[number], startTime);
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
};

export default playNotes;