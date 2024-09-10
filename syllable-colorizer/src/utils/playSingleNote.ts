// src/utils/playSingleNote.ts

const playSingleNote = (
    audioContext: AudioContext,
    frequency: number,
    startTime: number,
    noteDuration: number
  ) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + noteDuration);
  };

export default playSingleNote;