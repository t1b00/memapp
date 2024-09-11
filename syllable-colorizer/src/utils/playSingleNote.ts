// src/utils/playSingleNote.ts
const playSingleNote = (
  audioContext: AudioContext,
  frequency: number,
  startTime: number,
  noteDuration: number
) => {
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Use currentTime instead of startTime
  oscillator.connect(audioContext.destination);
  oscillator.start(audioContext.currentTime); // Start immediately
  oscillator.stop(audioContext.currentTime + noteDuration); 
};

export default playSingleNote;