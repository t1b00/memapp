// src/components/PlayButton.tsx
import React from 'react';
import appConfig from '../config';
import playNotes from '../utils/playNotes';

interface PlayButtonProps {
  syllableData: [string, number][];
  setCurrentSyllableIndex: React.Dispatch<React.SetStateAction<number | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayButton: React.FC<PlayButtonProps> = ({ syllableData, setCurrentSyllableIndex, isPlaying, setIsPlaying }) => (
  <button
    onClick={() => playNotes(syllableData, setCurrentSyllableIndex, setIsPlaying)}
    style={{
      pointerEvents: isPlaying ? 'none' : 'auto',
      cursor: isPlaying ? 'not-allowed' : 'pointer'
    }}
  >
    {appConfig.playButtonText}
  </button>
);

export default PlayButton;